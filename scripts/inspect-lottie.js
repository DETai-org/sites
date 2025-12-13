#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const DEFAULT_PATH = path.join(process.cwd(), "public", "assets", "animations", "logo.json");

const targetPath = path.resolve(process.argv[2] || DEFAULT_PATH);

function readLottie(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function mapLayerType(typeCode) {
  if (typeof typeCode === "string") {
    const shapeMapping = {
      gr: "Shape group",
      el: "Ellipse",
      rc: "Rectangle",
      sh: "Shape path",
      tm: "Trim paths",
      st: "Stroke",
      fl: "Fill",
      tr: "Transform",
      gs: "Gradient stroke",
      gf: "Gradient fill",
      sr: "Star",
    };

    return shapeMapping[typeCode] || `Shape item (${typeCode})`;
  }

  const mapping = {
    0: "Pre-comp",
    1: "Solid",
    2: "Image",
    3: "Null",
    4: "Shape",
    5: "Text",
    6: "Audio",
    7: "Placeholder",
    8: "Guide",
    9: "Video",
    10: "Image sequence",
    11: "Video/placeholder",
  };

  return mapping[typeCode] || `Unknown (${typeCode})`;
}

function hasTrimPaths(shapes = []) {
  return shapes.some((item) => {
    if (!item || typeof item !== "object") {
      return false;
    }

    if (item.ty === "tm") {
      return true;
    }

    const nested = item.it || item.shapes;
    return Array.isArray(nested) ? hasTrimPaths(nested) : false;
  });
}

function summarizeProp(prop) {
  if (!prop && prop !== 0) {
    return null;
  }

  if (typeof prop === "number") {
    return { type: "static", value: prop };
  }

  const isAnimated = typeof prop === "object" && prop.a === 1;

  if (isAnimated) {
    const keyframes = Array.isArray(prop.k) ? prop.k : [];
    const first = keyframes[0] || {};
    const last = keyframes[keyframes.length - 1] || {};

    return {
      type: "keyframes",
      frames: keyframes.length,
      startFrame: first.t ?? null,
      endFrame: last.t ?? null,
      startValue: first.s ?? first.k ?? null,
      endValue: last.s ?? last.k ?? null,
    };
  }

  return { type: "static", value: prop.k ?? prop }; 
}

function getTransform(node) {
  if (node.ks && typeof node.ks === "object") {
    return node.ks;
  }

  if (node.it && Array.isArray(node.it)) {
    return node.it.find((item) => item.ty === "tr") || null;
  }

  return null;
}

function summarizeTransform(node) {
  const transform = getTransform(node);

  if (!transform) {
    return null;
  }

  return {
    position: summarizeProp(transform.p),
    scale: summarizeProp(transform.s),
    rotation: summarizeProp(transform.r ?? transform.rx ?? transform.ry ?? transform.rz),
    opacity: summarizeProp(transform.o),
  };
}

function detectFeatureFlags(layers) {
  let hasMasks = false;
  let hasTrackMattes = false;
  let hasTimeRemap = false;
  let hasTextLayers = false;
  let hasEffects = false;
  let hasTrimPathsFlag = false;

  layers.forEach((layer) => {
    if (Array.isArray(layer.masksProperties) && layer.masksProperties.length > 0) {
      hasMasks = true;
    }

    if (typeof layer.tt === "number" && layer.tt > 0) {
      hasTrackMattes = true;
    }

    if (layer.tm !== undefined) {
      hasTimeRemap = true;
    }

    if (layer.ty === 5 || layer.t) {
      hasTextLayers = true;
    }

    if (Array.isArray(layer.ef) && layer.ef.length > 0) {
      hasEffects = true;
    }

    if (hasTrimPaths(layer.shapes)) {
      hasTrimPathsFlag = true;
    }
  });

  return { hasMasks, hasTrackMattes, hasTimeRemap, hasTextLayers, hasEffects, hasTrimPaths: hasTrimPathsFlag };
}

function makeLayerSummary(layers, context) {
  return layers.map((layer, index) => {
    const layerTrimPaths = hasTrimPaths(layer.shapes);

    return {
      context,
      index: index + 1,
      name: layer.nm,
      type: mapLayerType(layer.ty),
      hasMasks: Array.isArray(layer.masksProperties) && layer.masksProperties.length > 0,
      hasTrackMatte: typeof layer.tt === "number" && layer.tt > 0,
      hasTimeRemap: layer.tm !== undefined,
      hasEffects: Array.isArray(layer.ef) && layer.ef.length > 0,
      hasText: layer.ty === 5 || Boolean(layer.t),
      hasTrimPaths: layerTrimPaths,
    };
  });
}

function collectLayerContexts(data) {
  const contexts = [];

  if (Array.isArray(data.layers)) {
    contexts.push({ label: "root", layers: data.layers });
  }

  if (Array.isArray(data.assets)) {
    data.assets.forEach((asset, index) => {
      if (Array.isArray(asset.layers)) {
        const label = asset.nm ? `asset:${asset.nm}` : asset.id ? `asset:${asset.id}` : `asset[${index}]`;
        contexts.push({ label, layers: asset.layers });
      }
    });
  }

  return contexts;
}

function matchedLabels(name) {
  const patterns = [
    { label: "PULSE_CTRL", regex: /PULSE_CTRL/i },
    { label: "Pulse", regex: /Pulse/i },
    { label: "psi_left", regex: /psi_left/i },
    { label: "psi_right", regex: /psi_right/i },
    { label: "circle_*", regex: /circle_/i },
    { label: "arrow_*", regex: /arrow_/i },
    { label: "p/i/k", regex: /(?:^|\b)(p|i|k)(?:\b|$)/i },
  ];

  return patterns.filter((pattern) => pattern.regex.test(name)).map((pattern) => pattern.label);
}

function traverseNamedNodes(node, pathLabel, results) {
  if (!node || typeof node !== "object") {
    return;
  }

  if (node.nm && typeof node.nm === "string") {
    const labels = matchedLabels(node.nm);

    if (labels.length > 0) {
      results.push({
        name: node.nm,
        matches: labels,
        path: pathLabel,
        type: node.ty ? mapLayerType(node.ty) : null,
        transform: summarizeTransform(node),
      });
    }
  }

  if (Array.isArray(node)) {
    node.forEach((item, index) => {
      traverseNamedNodes(item, `${pathLabel}[${index}]`, results);
    });
    return;
  }

  Object.entries(node).forEach(([key, value]) => {
    traverseNamedNodes(value, `${pathLabel}.${key}`, results);
  });
}

function main() {
  const data = readLottie(targetPath);
  const layerContexts = collectLayerContexts(data);
  const rootLayers = Array.isArray(data.layers) ? data.layers : [];
  const assetContexts = layerContexts.filter((item) => item.label !== "root");
  const allLayers = layerContexts.flatMap((item) => item.layers);

  const layerSummary = makeLayerSummary(rootLayers, "root");
  const flags = detectFeatureFlags(allLayers);

  const namedObjects = [];
  traverseNamedNodes(data, "root", namedObjects);

  const report = {
    file: targetPath,
    basic: {
      version: data.v,
      frameRate: data.fr,
      inPoint: data.ip,
      outPoint: data.op,
      width: data.w,
      height: data.h,
    },
    layers: {
      total: rootLayers.length,
      items: layerSummary,
    },
    assetLayers: assetContexts.map((context) => ({
      context: context.label,
      total: context.layers.length,
      items: makeLayerSummary(context.layers, context.label),
    })),
    features: flags,
    namedObjects,
  };

  console.log(JSON.stringify(report, null, 2));
}

main();
