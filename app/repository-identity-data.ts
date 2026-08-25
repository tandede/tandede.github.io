export type RepositoryBadge = {
  image: string;
  alt: string;
  href: string;
};

export type RepositoryVisual = {
  banner?: {
    image: string;
    alt: string;
    mode?: 'cover' | 'contain';
  };
  showcase?: {
    image: string;
    alt: string;
    caption: string;
    mode?: 'cover' | 'contain';
  };
  badge?: RepositoryBadge;
  tags?: string[];
};

export const repositoryVisuals: Record<string, RepositoryVisual> = {
  webots: {
    showcase: {
      image: 'https://raw.githubusercontent.com/cyberbotics/webots/master/docs/guide/images/main_window.png',
      alt: 'Webots 官方三维机器人仿真界面',
      caption: 'README 展示的 Webots 三维仿真工作区：场景、传感器、控制器与调试界面在同一环境中协作。',
    },
    tags: ['Robot Simulation', 'ROS / ROS 2', 'Desktop · Cloud'],
  },
  'lm-evaluation-harness': {
    badge: {
      image: 'https://zenodo.org/badge/DOI/10.5281/zenodo.10256836.svg',
      alt: 'LM Evaluation Harness Zenodo DOI',
      href: 'https://doi.org/10.5281/zenodo.10256836',
    },
    tags: ['Open LLM Leaderboard Backend', 'Reproducible Evaluation'],
  },
  'openai-agents-sdk': {
    showcase: {
      image: 'https://cdn.openai.com/API/docs/images/orchestration.png',
      alt: 'OpenAI Agents SDK 官方编排与追踪界面',
      caption: '官方文档中的编排与追踪界面，展示 Agent、工具调用和 Handoff 如何进入同一条可观测链路。',
    },
    tags: ['Agents · Tools · Handoffs', 'Tracing', 'MCP'],
  },
  'ultralytics-yolo': {
    banner: {
      image: 'https://raw.githubusercontent.com/ultralytics/assets/main/yolov8/banner-yolov8.png',
      alt: 'Ultralytics YOLO 官方横幅',
      mode: 'contain',
    },
    badge: {
      image: 'https://trendshift.io/api/badge/repositories/1556',
      alt: 'Ultralytics Trendshift 排名标记',
      href: 'https://trendshift.io/repositories/1556',
    },
    tags: ['Detect · Segment · Pose', 'Python · CLI', 'Multi-format Export'],
  },
  timm: {
    badge: {
      image: 'https://zenodo.org/badge/168799526.svg',
      alt: 'timm Zenodo DOI',
      href: 'https://doi.org/10.5281/zenodo.4414861',
    },
    tags: ['Models · Weights · Recipes'],
  },
  supervision: {
    banner: {
      image: 'https://media.roboflow.com/open-source/supervision/rf-supervision-banner.png?updatedAt=1678995927529',
      alt: 'Supervision 官方紫蓝渐变横幅',
      mode: 'contain',
    },
    badge: {
      image: 'https://trendshift.io/api/badge/repositories/124',
      alt: 'Supervision GitHub Trending #1 Repository of the Day',
      href: 'https://trendshift.io/repositories/124',
    },
    tags: ['PyPI · v0.30.1', 'Python 3.10–3.14', 'MIT'],
  },
  funasr: {
    banner: {
      image: 'https://svg-banners.vercel.app/api?type=origin&text1=FunASR%F0%9F%A4%A0&text2=%F0%9F%92%96%20A%20Fundamental%20End-to-End%20Speech%20Recognition%20Toolkit&width=800&height=210',
      alt: 'FunASR 官方语音识别工具箱横幅',
      mode: 'contain',
    },
    badge: {
      image: 'https://trendshift.io/api/badge/repositories/10479',
      alt: 'FunASR Trendshift 排名标记',
      href: 'https://trendshift.io/repositories/10479',
    },
    tags: ['End-to-End ASR', 'Offline · Streaming', 'ModelScope'],
  },
  burn: {
    showcase: {
      image: 'https://raw.githubusercontent.com/tracel-ai/burn/main/assets/burn-train-tui.png',
      alt: 'Burn 官方训练终端界面',
      caption: 'Burn README 展示的训练终端：在 Rust 深度学习工作流中实时查看指标、学习率和设备状态。',
    },
    tags: ['Rust', 'Multi-backend', 'Train · Infer · Deploy'],
  },
  lerobot: {
    showcase: {
      image: 'https://raw.githubusercontent.com/huggingface/lerobot/main/media/readme/robots_control_video.webp',
      alt: 'LeRobot 官方机器人控制演示',
      caption: 'LeRobot README 中的真实机器人控制演示，连接数据采集、策略训练与硬件执行。',
    },
    tags: ['Robotics', 'Datasets · Policies', 'Hardware Ecosystem'],
  },
};
