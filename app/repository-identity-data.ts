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
    title: string;
    caption: string;
    mode?: 'cover' | 'contain';
  };
  badge?: RepositoryBadge;
  tags?: string[];
};

export const repositoryVisuals: Record<string, RepositoryVisual> = {
  tensorly: {
    banner: {
      image: 'https://raw.githubusercontent.com/tensorly/tensorly/main/doc/_static/logos/logo_tensorly.png',
      alt: 'TensorLy 官方项目标识',
      mode: 'contain',
    },
    showcase: {
      image: 'https://raw.githubusercontent.com/tensorly/tensorly/main/doc/_static/tensorly-pyramid.png',
      alt: 'TensorLy 从多框架后端、核心张量运算到张量分解和深度张量网络的能力层次',
      title: '同一张量算法建立在可切换后端契约之上',
      caption: '底层把 NumPy、SciPy、PyTorch、JAX、TensorFlow、CuPy 与 Paddle 统一为可切换后端，上层的张量运算、分解和回归因而能够复用同一算法接口。本次修复发生在这条抽象边界：稀疏 NumPy 后端既要兑现统一的 SVD 契约，也要让 reduced 分解停留在稀疏 Gram 矩阵路径，避免 Robust PCA 为一次阈值更新付出整矩阵稠密化的内存代价。',
      mode: 'contain',
    },
    tags: ['Tensor Decomposition', 'Sparse Robust PCA', 'NumPy · SciPy · Multi-backend'],
  },
  crewai: {
    banner: {
      image: 'https://raw.githubusercontent.com/crewAIInc/crewAI/main/docs/images/crew_only_logo.png',
      alt: 'CrewAI 官方项目标识',
      mode: 'contain',
    },
    showcase: {
      image: 'https://raw.githubusercontent.com/crewAIInc/crewAI/main/docs/images/asset.png',
      alt: 'CrewAI 的 Crews 与 Flows 架构：Agent 通过 Memory 获得上下文，事件流通过 State 保持状态',
      title: 'Memory 位于 Agent 协作与长期上下文的交界处',
      caption: '左侧展示 Crew 以多个 Agent、工具和任务协作完成目标，Memory 为这些角色提供可持续访问的上下文；右侧则由 Flow 以显式状态和代码路径控制执行。MemoryScope 与 MemorySlice 是这层上下文的可复用视图，因此配置一旦在校验中被消耗，后续 Agent 或任务就可能拿到没有底层 Memory 的同名视图。',
      mode: 'contain',
    },
    tags: ['Multi-Agent Orchestration', 'Crews · Flows · Memory', 'Python · Pydantic'],
  },
  markitdown: {
    tags: ['Document → Markdown', 'Python · File URI', 'LLM Data Pipelines'],
  },
  onnx: {
    tags: ['Model Interchange · Operators', 'Reference Evaluator', 'Python · NumPy'],
  },
  sillytavern: {
    banner: {
      image: 'https://github.com/user-attachments/assets/01a6ae9a-16aa-45f2-8bff-32b5dc587e44',
      alt: 'SillyTavern 官方横幅与面向高级用户的 LLM 前端定位',
      mode: 'contain',
    },
    tags: ['LLM Frontend', 'NovelAI · Generation Settings', 'JavaScript · Local-first'],
  },
  pinocchio: {
    banner: {
      image: 'https://raw.githubusercontent.com/stack-of-tasks/pinocchio/devel/doc/images/pinocchio-logo-large.png',
      alt: 'Pinocchio 官方标识与高性能刚体动力学定位',
      mode: 'contain',
    },
    showcase: {
      image: 'https://raw.githubusercontent.com/stack-of-tasks/pinocchio/devel/doc/images/pinocchio-performances.png',
      alt: 'Pinocchio README 展示的多种机器人动力学计算性能对比',
      title: '不同机器人模型的动力学计算耗时',
      caption: '横轴对应从四足到人形机器人的不同模型，纵轴比较多种动力学算法的平均执行时间。Pinocchio 依赖高度模板化的 Eigen 表达式在同一实现中兼顾模型规模、标量类型和速度；本次兼容性修复保证这套性能抽象在 GCC 10 下仍能正确实例化与比较对齐映射。',
      mode: 'contain',
    },
    tags: ['Rigid Body Dynamics', 'C++ · Python · ROS', 'Eigen · Analytical Derivatives'],
  },
  evo: {
    showcase: {
      image: 'https://raw.githubusercontent.com/MichaelGrupp/evo/master/doc/assets/res_dist.png',
      alt: 'evo README 展示的轨迹误差分布统计图',
      title: '轨迹误差如何汇总为统计分布',
      caption: '图中把多条轨迹估计的位姿误差整理为可比较的分布。距离型 RPE 会先按运动距离生成轨迹对，再为每一对计算相对运动误差；若遗漏第一段，样本数量、距离覆盖范围和最终统计分布都会一起偏移。',
      mode: 'contain',
    },
    tags: ['Odometry · SLAM', 'APE · RPE', 'Python · NumPy'],
  },
  'vit-pytorch': {
    showcase: {
      image: 'https://raw.githubusercontent.com/lucidrains/vit-pytorch/main/images/vit.gif',
      alt: 'vit-pytorch README 展示的 Vision Transformer 图像分块与序列建模动画',
      title: '图像如何被拆成可独立采样的 Token 序列',
      caption: '动画展示 Vision Transformer 把图像切分为 patch，并将它们组织成序列表示。DecorrelationLoss 接收的正是带有 layer、batch、token 与 embedding 维度的中间激活；本次修复确保采样只缩短 token 轴，不会重排或复制前面的 batch。',
      mode: 'contain',
    },
    tags: ['Vision Transformer', 'PyTorch', 'Attention · Decorrelation'],
  },
  langchain: {
    banner: {
      image: 'https://raw.githubusercontent.com/langchain-ai/langchain/master/.github/images/logo-light.svg',
      alt: 'LangChain 官方项目标识',
      mode: 'contain',
    },
    tags: ['Agent Engineering', 'Python · LangChain Core', 'Models · Tools · Retrieval'],
  },
  webots: {
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
    showcase: {
      image: 'https://raw.githubusercontent.com/borglab/gtsam/develop/doc/images/gtsam-manifold-optimization-light.png',
      alt: 'GTSAM 官方流形优化工作流：构建因子图、在线性空间求解并映射回流形',
      title: '因子图变量从连接、求解到边缘化的完整生命周期',
      caption: '图中从因子图建模开始，经过线性化、求解与回映射不断迭代。Fixed-lag smoother 只有在变量已经连接到图并拥有 Bayes-tree clique 时才能沿标准路径边缘化；本次修复把仍在等待 factor 的 pending value 单独管理，避免它被错误送入要求 clique 的生命周期。',
      mode: 'contain',
    },
    tags: ['Factor Graphs', 'Smoothing · Mapping', 'C++ · Python · MATLAB'],
  },
  'jolt-physics': {
    tags: ['C++17', 'Rigid Body · Collision', 'Games · VR · Deterministic'],
  },
  pytorch3d: {
    banner: {
      image: 'https://raw.githubusercontent.com/facebookresearch/pytorch3d/main/.github/pytorch3dlogo.png',
      alt: 'PyTorch3D 官方项目标识',
      mode: 'contain',
    },
    tags: ['3D Computer Vision', 'Differentiable Rendering', 'PyTorch · GPU'],
  },
  rtabmap: {
    showcase: {
      image: 'https://github.com/user-attachments/assets/8306f095-5bf0-416d-88f3-e5a82fa23af8',
      alt: 'RTAB-Map DatabaseViewer 在无效回环检测配置下遗留进度对话框的原始问题截图',
      title: '无任务可执行，进度窗口却已被创建',
      caption: '截图中 intra-session 与 inter-session 均未启用，回环检测没有任何合法搜索范围；但空白进度窗口已经覆盖 DatabaseViewer，既不会推进，也无法经过正常完成路径关闭。修复把参数校验前移，在创建对话框之前直接终止无效请求。',
      mode: 'contain',
    },
    tags: ['Visual · LiDAR SLAM', 'Loop Closure · Graph Optimization', 'C++ · Qt · ROS / ROS 2'],
  },
  symforce: {
    banner: {
      image: 'https://raw.githubusercontent.com/symforce-org/symforce/main/docs/static/images/symforce_banner.png',
      alt: 'SymForce 官方项目横幅',
      mode: 'contain',
    },
    showcase: {
      image: 'https://raw.githubusercontent.com/symforce-org/symforce/main/docs/static/images/symforce_diagram.png',
      alt: 'SymForce 官方符号计算、代码生成与优化架构图',
      title: '矩阵类型跨越代码生成边界的位置',
      caption: '图中间的 Codegen 把符号工具箱建立的几何与用户函数转换为运行时代码，再把残差和导数交给优化器。本次修复位于 Rust 后端的返回类型生成处：同时保留矩阵行列结构，才能让结果准确进入 nalgebra 的静态矩阵类型。',
      mode: 'contain',
    },
    tags: ['Symbolic Computation', 'Code Generation · Optimization', 'Python · C++ · Rust'],
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
      title: '名称是追踪树中识别节点的第一索引',
      caption: '界面把 Agent、模型请求、工具调用与 Handoff 展开成同一条追踪树。节点名称若被非字符串对象意外覆盖，列表标题、层级检索和详情定位都会失去稳定标识；修复通过局部名称变量隔离 SDK 节点与应用对象，避免写回污染。',
      mode: 'contain',
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
    tags: ['Rust', 'Multi-backend', 'Train · Infer · Deploy'],
  },
  lerobot: {
    tags: ['Robotics', 'Datasets · Policies', 'Hardware Ecosystem'],
  },
};
