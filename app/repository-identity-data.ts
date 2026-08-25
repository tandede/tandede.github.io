export type RepositoryIdentityMark = {
  label: string;
  value: string;
};

export type RepositoryIdentity = {
  image: string;
  imageAlt: string;
  imageMode?: 'cover' | 'contain' | 'banner';
  imagePosition?: string;
  summary: string;
  marks: [RepositoryIdentityMark, RepositoryIdentityMark, RepositoryIdentityMark];
  badge?: {
    image: string;
    alt: string;
    href: string;
    caption: string;
  };
};

export const repositoryIdentities: Record<string, RepositoryIdentity> = {
  webots: {
    image: 'https://raw.githubusercontent.com/cyberbotics/webots/master/docs/guide/images/main_window.png',
    imageAlt: 'Webots 官方三维机器人仿真界面',
    imageMode: 'cover',
    summary: 'Webots 把三维物理仿真、传感器、控制器和机器人中间件放进同一套开发环境，是 Cyberbotics 机器人仿真生态的核心入口。',
    marks: [
      { label: 'PLATFORM', value: 'Robot Simulation' },
      { label: 'INTEGRATION', value: 'ROS / ROS 2' },
      { label: 'RUNTIME', value: 'Desktop · Cloud' },
    ],
  },
  'lm-evaluation-harness': {
    image: 'https://opengraph.githubassets.com/1/EleutherAI/lm-evaluation-harness',
    imageAlt: 'EleutherAI LM Evaluation Harness 项目标识',
    imageMode: 'cover',
    summary: 'EleutherAI 的统一大模型评测框架把任务、提示、推理后端和指标收束为可复现接口，也是 Hugging Face Open LLM Leaderboard 的评测基础。',
    marks: [
      { label: 'ROLE', value: 'Open LLM Leaderboard Backend' },
      { label: 'SCOPE', value: '60+ Benchmark Families' },
      { label: 'ARCHIVE', value: 'Zenodo DOI' },
    ],
    badge: {
      image: 'https://zenodo.org/badge/DOI/10.5281/zenodo.10256836.svg',
      alt: 'LM Evaluation Harness Zenodo DOI',
      href: 'https://doi.org/10.5281/zenodo.10256836',
      caption: '可引用的软件档案与版本记录',
    },
  },
  numpyro: {
    image: 'https://raw.githubusercontent.com/pyro-ppl/numpyro/master/docs/source/_static/img/pyro_logo.png',
    imageAlt: 'NumPyro 官方 Pyro 标识',
    imageMode: 'contain',
    summary: 'NumPyro 将概率编程建立在 JAX 的编译、自动微分与向量化能力之上，面向高性能贝叶斯推断和可组合的生成式模型研究。',
    marks: [
      { label: 'FOUNDATION', value: 'JAX' },
      { label: 'INFERENCE', value: 'HMC · NUTS · SVI' },
      { label: 'DESIGN', value: 'Composable PPL' },
    ],
  },
  opencv: {
    image: 'https://raw.githubusercontent.com/opencv/opencv/4.x/doc/opencv-logo.png',
    imageAlt: 'OpenCV 官方标识',
    imageMode: 'contain',
    summary: 'OpenCV 是跨平台计算机视觉基础设施，从传统图像算子、几何与视频分析延伸到深度学习推理，为大量上层产品提供稳定接口。',
    marks: [
      { label: 'DOMAIN', value: 'Computer Vision' },
      { label: 'API', value: 'C++ · Python · Java' },
      { label: 'LICENSE', value: 'Apache 2.0' },
    ],
  },
  'openai-agents-sdk': {
    image: 'https://cdn.openai.com/API/docs/images/orchestration.png',
    imageAlt: 'OpenAI Agents SDK 官方编排与追踪界面',
    imageMode: 'cover',
    imagePosition: 'center top',
    summary: 'OpenAI Agents SDK 用少量核心原语组合 Agent、工具、Handoff、Guardrail 与 Tracing，让多 Agent 工作流保持轻量且可观测。',
    marks: [
      { label: 'PRIMITIVES', value: 'Agents · Tools · Handoffs' },
      { label: 'OBSERVABILITY', value: 'Built-in Tracing' },
      { label: 'CONNECTIVITY', value: 'MCP' },
    ],
  },
  peft: {
    image: '/logos/huggingface.png',
    imageAlt: 'Hugging Face 标识',
    imageMode: 'contain',
    summary: 'PEFT 只训练很小一部分附加参数即可适配大模型，将 LoRA、IA³、AdaLoRA 等方法统一到 Transformers 与 Diffusers 生态。',
    marks: [
      { label: 'METHODS', value: 'LoRA · IA³ · AdaLoRA' },
      { label: 'ECOSYSTEM', value: 'Transformers · Diffusers' },
      { label: 'GOAL', value: 'Parameter Efficiency' },
    ],
  },
  'ultralytics-yolo': {
    image: 'https://raw.githubusercontent.com/ultralytics/assets/main/yolov8/banner-yolov8.png',
    imageAlt: 'Ultralytics YOLO 官方视觉横幅',
    imageMode: 'banner',
    summary: 'Ultralytics YOLO 把数据、训练、验证、推理和导出串成统一工作流，覆盖检测、分割、姿态、分类和跟踪等视觉任务。',
    marks: [
      { label: 'TASKS', value: 'Detect · Segment · Pose' },
      { label: 'WORKFLOW', value: 'Python · CLI' },
      { label: 'DEPLOY', value: 'Multi-format Export' },
    ],
    badge: {
      image: 'https://trendshift.io/api/badge/repositories/1556',
      alt: 'Ultralytics Trendshift 排名标记',
      href: 'https://trendshift.io/repositories/1556',
      caption: '持续进入全球开发者趋势榜单',
    },
  },
  timm: {
    image: 'https://opengraph.githubassets.com/1/huggingface/pytorch-image-models',
    imageAlt: 'timm PyTorch Image Models 项目标识',
    imageMode: 'cover',
    summary: 'timm 汇集大规模视觉骨干、预训练权重、数据增强与训练配方，是图像模型研究、迁移学习和工程复现的重要基础设施。',
    marks: [
      { label: 'LIBRARY', value: 'PyTorch Image Models' },
      { label: 'ASSETS', value: 'Models · Weights · Recipes' },
      { label: 'USE', value: 'Research · Transfer' },
    ],
    badge: {
      image: 'https://zenodo.org/badge/168799526.svg',
      alt: 'timm Zenodo DOI',
      href: 'https://doi.org/10.5281/zenodo.4414861',
      caption: '研究复现可引用的软件版本',
    },
  },
  supervision: {
    image: 'https://media.roboflow.com/open-source/supervision/rf-supervision-banner.png?updatedAt=1678995927529',
    imageAlt: 'Supervision 官方紫蓝渐变横幅',
    imageMode: 'banner',
    summary: 'Supervision 是模型无关的计算机视觉工具层，连接检测结果、标注渲染、跟踪、数据集处理和真实业务分析。',
    marks: [
      { label: 'PACKAGE', value: 'PyPI · v0.30.1' },
      { label: 'RUNTIME', value: 'Python 3.10–3.14' },
      { label: 'LICENSE', value: 'MIT' },
    ],
    badge: {
      image: 'https://trendshift.io/api/badge/repositories/124',
      alt: 'Supervision GitHub Trending #1 Repository of the Day',
      href: 'https://trendshift.io/repositories/124',
      caption: 'GitHub Trending · #1 Repository of the Day',
    },
  },
  funasr: {
    image: 'https://svg-banners.vercel.app/api?type=origin&text1=FunASR%F0%9F%A4%A0&text2=%F0%9F%92%96%20A%20Fundamental%20End-to-End%20Speech%20Recognition%20Toolkit&width=800&height=210',
    imageAlt: 'FunASR 官方语音识别工具箱横幅',
    imageMode: 'banner',
    summary: 'FunASR 覆盖语音识别训练、离线与流式推理、端点检测、标点恢复和说话人相关能力，面向研究与产业部署。',
    marks: [
      { label: 'DOMAIN', value: 'End-to-End ASR' },
      { label: 'MODES', value: 'Offline · Streaming' },
      { label: 'ECOSYSTEM', value: 'ModelScope · MCP' },
    ],
    badge: {
      image: 'https://trendshift.io/api/badge/repositories/10479',
      alt: 'FunASR Trendshift 排名标记',
      href: 'https://trendshift.io/repositories/10479',
      caption: '开源语音工具链的趋势项目',
    },
  },
  burn: {
    image: 'https://raw.githubusercontent.com/tracel-ai/burn/main/assets/burn-train-tui.png',
    imageAlt: 'Burn 官方训练终端界面',
    imageMode: 'cover',
    imagePosition: 'center top',
    summary: 'Burn 用 Rust 构建训练、推理与部署一体的深度学习框架，通过可插拔后端在性能、类型安全和跨平台能力之间取得平衡。',
    marks: [
      { label: 'LANGUAGE', value: 'Rust' },
      { label: 'BACKENDS', value: 'WGPU · CUDA · NdArray' },
      { label: 'LIFECYCLE', value: 'Train · Infer · Deploy' },
    ],
  },
  nltk: {
    image: 'https://opengraph.githubassets.com/1/nltk/nltk',
    imageAlt: 'NLTK Natural Language Toolkit 项目标识',
    imageMode: 'cover',
    summary: 'NLTK 将自然语言处理算法、语料库接口和教学资源组织成经典 Python 工具箱，长期服务于课程、研究和原型验证。',
    marks: [
      { label: 'DOMAIN', value: 'Natural Language Processing' },
      { label: 'ASSETS', value: 'Corpora · Algorithms' },
      { label: 'AUDIENCE', value: 'Teaching · Research' },
    ],
  },
  'apache-tvm': {
    image: 'https://raw.githubusercontent.com/apache/tvm-site/main/images/logo/tvm-logo-small.png',
    imageAlt: 'Apache TVM 官方标识',
    imageMode: 'contain',
    summary: 'Apache TVM 是面向 CPU、GPU 和专用加速器的机器学习编译栈，把模型图优化、算子生成和多硬件部署连接起来。',
    marks: [
      { label: 'FOUNDATION', value: 'Apache Software Foundation' },
      { label: 'DOMAIN', value: 'ML Compiler' },
      { label: 'TARGETS', value: 'CPU · GPU · Accelerators' },
    ],
  },
  torchvision: {
    image: 'https://opengraph.githubassets.com/1/pytorch/vision',
    imageAlt: 'Torchvision 官方 PyTorch 视觉库项目标识',
    imageMode: 'cover',
    summary: 'Torchvision 是 PyTorch 官方视觉领域库，统一提供数据集、预训练模型、图像变换和高性能视觉算子。',
    marks: [
      { label: 'ECOSYSTEM', value: 'Official PyTorch Domain Library' },
      { label: 'MODULES', value: 'Datasets · Models · Transforms' },
      { label: 'RUNTIME', value: 'Python · C++ Ops' },
    ],
  },
  lerobot: {
    image: 'https://raw.githubusercontent.com/huggingface/lerobot/main/media/readme/robots_control_video.webp',
    imageAlt: 'LeRobot 官方机器人控制演示',
    imageMode: 'cover',
    summary: 'LeRobot 把真实机器人数据集、策略训练、评测与硬件控制汇集到统一开源生态，降低端到端机器人学习的复现门槛。',
    marks: [
      { label: 'DOMAIN', value: 'Real-world Robotics' },
      { label: 'PIPELINE', value: 'Data · Policy · Evaluation' },
      { label: 'HARDWARE', value: 'Open Robot Ecosystem' },
    ],
  },
};
