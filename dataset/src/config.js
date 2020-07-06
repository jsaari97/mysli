module.exports = [
  {
    name: "cpu",
    shape: ["td:nth-child(2) a p"],
  },
  {
    name: "ssd",
    product: "internal-hard-drive",
    query: "t=0",
    shape: ["td:nth-child(2) a p"],
  },
  {
    name: "motherboard",
    shape: ["td:nth-child(2) a p"],
  },
  {
    name: "power-supply",
    shape: ["td:nth-child(2) a p"],
  },
  {
    name: "memory",
    shape: ["td:nth-child(2) a p"],
  },
  {
    name: "sound-card",
    shape: ["td:nth-child(2) a p"],
  },
  {
    name: "internal-hard-drive",
    query: "t=1,5200,5400,5700,5760,5900,7200,10000,10025,10500,10520,15000",
    shape: ["td:nth-child(2) a p"],
  },
  {
    name: "video-card",
    shape: ["td:nth-child(2) a p"],
  },
  {
    name: "cpu-cooler",
    shape: ["td:nth-child(2) a p"],
  },
  {
    name: "case",
    shape: ["td:nth-child(2) a p"],
  },
  {
    name: "optical-drive",
    shape: ["td:nth-child(2) a p"],
  },
  {
    name: "wired-network-card",
    shape: ["td:nth-child(2) a p"],
  },
  {
    name: "wireless-network-card",
    shape: ["td:nth-child(2) a p"],
  },
];
