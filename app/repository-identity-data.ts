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
      caption: 'Webots 三维仿真工作区把场景树、机器人传感器、控制器代码与运行日志集中在同一界面中。开发者可以一边观察机器人在虚拟环境中的行为，一边调整控制逻辑、检查设备状态并定位仿真问题。',
    },
    tags: ['Robot Simulation', 'ROS / ROS 2', 'Desktop · Cloud'],
  },
  'robotics-toolbox-python': {
    tags: ['Robot Kinematics · Dynamics', '50+ Robot Models', 'Python 3.10+'],
  },
  simbody: {
    tags: ['C++ · CMake', 'Multibody Dynamics', 'Biomechanics · Robotics'],
  },
  faiss: {
    tags: ['C++ · Python', 'CPU · GPU', 'Billion-scale Vector Search'],
  },
  gtsam: {
    banner: {
      image: 'https://raw.githubusercontent.com/borglab/gtsam/develop/doc/images/gtsam-manifold-optimization-light.png',
      alt: 'GTSAM 官方流形优化工作流：构建因子图、在线性空间求解并映射回流形',
      mode: 'contain',
    },
    tags: ['Factor Graphs', 'Smoothing · Mapping', 'C++ · Python · MATLAB'],
  },
  deepspeed: {
    tags: ['Distributed Training', 'ZeRO', 'ZenFlow'],
  },
  'lm-evaluation-harness': {
    tags: ['Open LLM Leaderboard Backend', 'Reproducible Evaluation'],
  },
  'openai-agents-sdk': {
    showcase: {
      image: 'https://cdn.openai.com/API/docs/images/orchestration.png',
      alt: 'OpenAI Agents SDK 官方编排与追踪界面',
      caption: '这张编排图集中展示 Agent、工具调用、Handoff 与追踪关系，使多智能体工作流中的控制流、任务交接和可观测链路能够被快速理解与定位。',
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
      caption: 'Burn 的训练终端将损失、学习率、训练进度和设备状态组织在同一个实时界面中，让 Rust 深度学习任务在运行过程中也能保持清晰、可观察和便于诊断。',
    },
    tags: ['Rust', 'Multi-backend', 'Train · Infer · Deploy'],
  },
  lerobot: {
    showcase: {
      image: 'https://raw.githubusercontent.com/huggingface/lerobot/main/media/readme/robots_control_video.webp',
      alt: 'LeRobot 官方机器人控制演示',
      caption: '真实机器人控制演示呈现了从动作数据采集、策略训练到硬件执行的完整链路，直观说明 LeRobot 如何把机器人数据、学习算法和具体设备连接起来。',
    },
    tags: ['Robotics', 'Datasets · Policies', 'Hardware Ecosystem'],
  },
};
