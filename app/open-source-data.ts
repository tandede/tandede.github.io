export type OpenSourceProject = {
  slug: string;
  name: string;
  logo: string;
  accent: string;
  role: 'CONTRIBUTOR' | 'COMMITTER' | 'OWNER';
  href: string;
  prHref: string;
  function: string;
  problem: string;
  reasoning: string;
  solution: string;
  impact: string;
  highlight: string;
  takeaway: string;
  release?: {
    label: string;
    title: string;
    href: string;
    credit: string;
    steps: string[];
  };
  visualization: 'config' | 'jaxpr' | 'reflection' | 'identity' | 'adapter' | 'axis' | 'boundary' | 'coordinate' | 'routing' | 'numeric' | 'shared-state' | 'reshape-semantics' | 'quaternion' | 'tensor-layout' | 'parallel-inputs' | 'zenflow' | 'operational-acceleration';
};

export const openSourceProjects: OpenSourceProject[] = [
  {
    slug: 'webots', name: 'Webots', logo: 'https://github.com/cyberbotics.png?size=128', accent: '#e1261c', role: 'CONTRIBUTOR', href: 'https://github.com/cyberbotics/webots', prHref: 'https://github.com/cyberbotics/webots/pull/7009#pullrequestreview-5006270169',
    function: 'Cyberbotics 维护的开源机器人仿真平台，用于建模、编程和仿真机器人、车辆与机械系统，覆盖三维物理环境、传感器、控制器以及 ROS / ROS 2 工作流。',
    problem: '负单位四元数 `(-1, 0, 0, 0)` 与正单位四元数描述相同的恒等旋转，但旧转换会得到 2π 角度并继续归一化零长度向量，除零后生成 NaN 旋转轴，可能沿场景树或渲染路径触发崩溃。',
    reasoning: '四元数 q 与 −q 表示同一个三维旋转；当向量部分范数接近零时，不论标量符号如何都应落到恒等旋转。同时，向量部分非零的负标量四元数仍需保留原有轴与旋转角，不能被一概折叠。',
    solution: '在 `WbRotation::fromQuaternion()` 中只计算一次向量范数；遇到近零向量时直接返回有限的规范恒等轴角 `(0, 0, 1, 0)`，其余输入复用该范数继续正常归一化，并补充变更记录。',
    impact: '负单位、近退化与正单位四元数都稳定得到有限结果，非退化负标量输入仍保留预期旋转；完成维护者评审协作后，受 Olivier Michel 邀请加入 Cyberbotics Ltd. 的 Committers 团队。',
    highlight: 'CONTRIBUTOR → COMMITTER',
    takeaway: '修复退化四元数崩溃，并获邀成为 Committer',
    visualization: 'quaternion',
  },
  {
    slug: 'robotics-toolbox-python', name: 'Robotics Toolbox', logo: 'https://raw.githubusercontent.com/petercorke/robotics-toolbox-python/main/docs/figs/RobToolBox_RoundLogoB.png', accent: '#2f6f9f', role: 'CONTRIBUTOR', href: 'https://github.com/petercorke/robotics-toolbox-python', prHref: 'https://github.com/petercorke/robotics-toolbox-python/pull/629',
    function: '面向机器人研究与教学的 Python 工具箱，覆盖串联机械臂的运动学与动力学、雅可比矩阵、轨迹规划和控制，并提供 Puma 560、Franka Panda 等 50 余种机器人模型。',
    problem: '`DynamicsMixin.accel_x()` 的正常调用会走到未定义的 `T` 与 `J`，使已发布的 1.4.0 包直接抛出 `NameError`；同时结果缓冲区错误地使用关节数 `self.n` 作为列数，7 轴冗余机器人无法返回应有的六维笛卡尔加速度。',
    reasoning: '调用入口提供的是操作空间速度 `xd`。由 `xd = Ja · qd` 恢复关节速度后，末端加速度必须同时包含解析雅可比的时间导数项与关节加速度映射：`xdd = Jad · qd + Ja · qdd`。原实现混用了未生成的变换矩阵与几何雅可比，还隐含假设其变换导数为零。',
    solution: '复用现有 `jacob0_analytical()` 与带同一角度表示的 `jacob0_dot()`，直接计算完整解析关系；将单点和轨迹输出统一为固定 6 维，并同步修正文档中的速度、外力和轨迹形状语义。',
    impact: 'Puma 560 的单点及双样本轨迹现在得到一致的有限数值结果，7 轴 Panda 也稳定返回 `(6,)` 笛卡尔向量。PR #629 关闭长期存在的 #576，并通过 Linux、Windows、macOS 与 Python 3.10–3.14 的完整 CI 后合入主分支。',
    highlight: 'xdd = J̇a q̇ + Ja q̈',
    takeaway: '恢复六维末端加速度的完整动力学关系',
    visualization: 'operational-acceleration',
  },
  {
    slug: 'lm-evaluation-harness', name: 'LM Evaluation Harness', logo: 'https://github.com/EleutherAI.png?size=128', accent: '#313131', role: 'CONTRIBUTOR', href: 'https://github.com/EleutherAI/lm-evaluation-harness', prHref: 'https://github.com/EleutherAI/lm-evaluation-harness/pull/4020',
    function: '广泛使用的大语言模型评测框架，将任务定义、few-shot 模板、生成参数和推理后端统一到可复现流水线，支持跨模型、跨基准的标准化比较。',
    problem: '延迟注解使 dataclass 字段类型不再等同于运行时 dict，CLI 与 YAML 两条配置入口行为不一致。',
    reasoning: '定位到 f.type is dict 恒为假，核心不是某个任务的配置错误，而是两条入口没有共享同一套类型识别与规范化边界。',
    solution: '用 DICT_KEYS 统一识别字典字段，并将 YAML 字符串规范化前移到共享配置流水线，让 CLI 与纯 YAML 入口复用同一条解析路径。',
    impact: '消除入口差异导致的静默配置偏差，使任务配置在不同调用方式下保持一致，也降低后续新增字典字段时重复修补的维护成本。',
    highlight: 'ONE CONFIG PATH',
    takeaway: '让 CLI 与 YAML 配置进入同一条解析路径',
    visualization: 'config',
  },
  {
    slug: 'numpyro', name: 'NumPyro', logo: 'https://github.com/pyro-ppl.png?size=128', accent: '#e94b2a', role: 'CONTRIBUTOR', href: 'https://github.com/pyro-ppl/numpyro', prHref: 'https://github.com/pyro-ppl/numpyro/pull/2245',
    function: '建立在 JAX 之上的概率编程框架，覆盖 HMC、NUTS、SVI 等贝叶斯推断算法，并利用 JIT、自动微分和多设备并行提升推断效率。',
    problem: 'JAX 0.11.1 将闭包常量提升进 jaxpr 后，provenance 动态输入与变量发生错位。',
    reasoning: '问题来自私有 tracing API 对常量布局的隐式假设；版本升级后常量和动态参数共用输入序列，旧映射关系不再成立。',
    solution: '改用公共 jax.make_jaxpr 获取 ClosedJaxpr，显式分离常量与动态输入，重建 provenance 输入映射并解除对私有 tracing API 的耦合。',
    impact: '恢复新版本 JAX 下的 provenance 正确性，并把实现建立在稳定公共接口上，减少后续 JAX 内部改动造成的兼容性风险。',
    highlight: 'PUBLIC JAXPR',
    takeaway: '用公共 JAXPR 接口恢复输入映射',
    visualization: 'jaxpr',
  },
  {
    slug: 'opencv', name: 'OpenCV', logo: '/logos/opencv.svg', accent: '#6652d9', role: 'CONTRIBUTOR', href: 'https://github.com/opencv/opencv', prHref: 'https://github.com/opencv/opencv/pull/29751',
    function: '跨平台计算机视觉基础库，提供图像处理、几何变换、特征提取、视频分析与深度学习推理等大量工程级算子和统一接口。',
    problem: '极端反射坐标在逐次修正中触发整数溢出，并可能执行十亿级循环。',
    reasoning: '反射边界并不是需要逐次模拟的过程，而是一个具有固定周期的坐标映射；只要在更宽的整数域中求周期位置，就能一次确定结果。',
    solution: '将循环反射改写为 int64 周期模运算，在完整坐标域内直接完成映射，并处理边界长度与负坐标等特殊情况。',
    impact: '同时修复溢出与极端耗时问题，把最坏时间复杂度从随坐标距离增长的 O(N) 降为常数级 O(1)。',
    highlight: 'O(N) → O(1)',
    takeaway: '极端反射坐标从十亿次循环降为常数时间',
    visualization: 'reflection',
  },
  {
    slug: 'deepspeed', name: 'DeepSpeed', logo: 'https://github.com/deepspeedai.png?size=128', accent: '#2859a8', role: 'CONTRIBUTOR', href: 'https://github.com/deepspeedai/DeepSpeed', prHref: 'https://github.com/deepspeedai/DeepSpeed/pull/8274',
    function: '面向大模型训练与推理的分布式深度学习优化系统，通过 ZeRO、并行训练、通信优化与内存管理降低超大模型的训练成本，并提升多 GPU / 多节点执行效率。',
    problem: 'ZenFlow 配置曾接受 `topk_ratio=0/1` 以及非正数 `update_interval`，训练初始化后可能分别触发梯度归一化除零和非法调度；即使比例合法，ZeRO-1/2 的小分区也可能因整数截断选择 0 列，进一步让 `torch.topk(k=0)` 与缓冲区尺寸失去有效语义。',
    reasoning: '自动更新路径同时除以 `topk_ratio` 与 `1-topk_ratio`，显式更新路径执行 `micro_step // update_interval`，因此两组除数都必须在配置边界被约束。对小比例选择，还必须以分区为单位统一计算选择数，并让索引缓冲区、梯度缓冲区和实际选择逻辑复用同一公式。',
    solution: '将比例约束为严格的 `(0,1)`，要求数值更新间隔至少为 1；新增共享的分区选择计数逻辑：空分区保持 0，非空分区使用 `max(1, int(columns × ratio))`，并同步应用到两条选择路径及对应缓冲区分配。',
    impact: '非法配置现在会在训练启动前直接失败；`topk_ratio=0.01` 与 50 列参数等小比例场景在 ZeRO-1/2 中仍保持非空选择，索引和梯度缓冲区与实际分区选择严格对齐。该修复经多轮维护者审查后以 PR #8274 合入 DeepSpeed master。',
    highlight: 'VALIDATE → SELECT → ALLOCATE',
    takeaway: '训练前拦截非法配置，小比例分区也不再空选',
    visualization: 'zenflow',
  },
  {
    slug: 'openai-agents-sdk', name: 'OpenAI Agents SDK', logo: '/logos/openai.png', accent: '#111827', role: 'CONTRIBUTOR', href: 'https://github.com/openai/openai-agents-python', prHref: 'https://github.com/openai/openai-agents-python/pull/4512',
    function: '面向生产级 Agent 应用的轻量编排框架，统一 Agent、Tool、Handoff、Guardrail、Tracing 与 MCP 接入，支持构建可观测的多 Agent 工作流。',
    problem: '同名 Agent、Tool 与 MCP Server 以显示名为键，导致 Graphviz 合并节点或产生伪自环。',
    reasoning: '显示名称服务于阅读，但不能承担实体身份；图遍历、节点注册和边生成需要共享稳定的唯一标识，同时保留原始名称作为可读标签。',
    solution: '以对象身份注册节点，把显示名降为 label，并重构遍历与边生成链路，确保不同类型或不同实例即使同名也不会被错误合并。',
    impact: '生成的工作流图能够真实表达实体关系，避免错误节点、漏边和伪自环影响调试与架构理解。',
    highlight: 'IDENTITY ≠ LABEL',
    takeaway: '实体身份与显示名称分离，工作流图不再错连',
    visualization: 'identity',
  },
  {
    slug: 'peft', name: 'PEFT', logo: '/logos/huggingface.png', accent: '#d69300', role: 'CONTRIBUTOR', href: 'https://github.com/huggingface/peft', prHref: 'https://github.com/huggingface/peft/pull/3559',
    function: 'Hugging Face 的参数高效微调框架，通过 LoRA、IA³、AdaLoRA 等方法只训练少量参数，降低 Transformer 与 Diffusion 模型适配成本。',
    problem: '重复 adapter_name 会静默覆盖配置并再次注入层，已有训练权重存在被破坏风险。',
    reasoning: '这不是简单的命名冲突，而是状态原子性问题；如果检查发生在修改之后，即使抛出异常，模型也可能已经处于部分更新状态。',
    solution: '将 Adapter 唯一性校验前移到任何模型或配置突变之前，冲突时立即失败，并确保错误路径不触碰既有 Adapter。',
    impact: '把危险的静默覆盖变成可解释的早期错误，同时保护已训练权重和模型结构，保证失败操作可安全回退。',
    highlight: 'FAIL BEFORE MUTATE',
    takeaway: '在修改模型之前拒绝重复 Adapter',
    visualization: 'adapter',
  },
  {
    slug: 'ultralytics-yolo', name: 'Ultralytics YOLO', logo: '/logos/ultralytics.png', accent: '#052251', role: 'CONTRIBUTOR', href: 'https://github.com/ultralytics/ultralytics', prHref: 'https://github.com/ultralytics/ultralytics/pull/25855',
    function: '覆盖目标检测、实例分割、图像分类、姿态估计与多目标跟踪的视觉平台，提供从数据训练到部署推理的一体化 Python 与 CLI 工作流。',
    problem: '非等比例 resize 与 LetterBox 组合后仍按单一比例恢复坐标，导致预测框位置失真。',
    reasoning: 'x、y 轴实际经历了不同缩放和留白，逆变换不能只使用一个 gain；必须沿完整预处理链，分别恢复两个轴的比例与偏移。',
    solution: '组合前置 resize 与 LetterBox 的变换参数，使用 x/y 双轴比例和 padding 偏移逐轴恢复原图坐标。',
    impact: '修复非方形输入与组合预处理场景中的坐标漂移，使检测、分割等任务输出能够稳定映射回原始图像。',
    highlight: 'SCALE X ≠ SCALE Y',
    takeaway: '分别还原 x / y 轴，让预测结果准确回到原图',
    visualization: 'axis',
  },
  {
    slug: 'timm', name: 'timm', logo: '/logos/huggingface.png', accent: '#d69300', role: 'CONTRIBUTOR', href: 'https://github.com/huggingface/pytorch-image-models', prHref: 'https://github.com/huggingface/pytorch-image-models/pull/2739',
    function: '大规模 PyTorch 图像模型库，汇集分类与视觉骨干网络、预训练权重、数据增强和训练工具，是视觉模型研究与复现的重要基础设施。',
    problem: 'CutMix minmax 边界使用上界排除采样，遗漏最右与最下的合法裁剪起点。',
    reasoning: '这是离散坐标区间的 off-by-one：不会直接崩溃，却会在长期训练中让边界位置永远无法被采样，形成隐蔽的位置分布偏差。',
    solution: '修正随机采样上界并补齐右侧与底部边界位置，使所有合法裁剪起点进入同一均匀分布。',
    impact: '恢复 CutMix 空间采样的完整覆盖，避免边界区域系统性欠采样，让增强行为与设计语义保持一致。',
    highlight: 'FULL BOUNDARY COVERAGE',
    takeaway: '补回 CutMix 从未采到的右侧与底部边界',
    visualization: 'boundary',
  },
  {
    slug: 'supervision', name: 'Supervision', logo: '/logos/supervision.png', accent: '#6f3ea3', role: 'CONTRIBUTOR', href: 'https://github.com/roboflow/supervision', prHref: 'https://github.com/roboflow/supervision/pull/2491',
    function: '面向计算机视觉工程的通用工具库，覆盖检测结果表示、几何计算、标注渲染、视频跟踪与数据集处理，连接模型输出与业务分析。',
    problem: '大坐标多边形计算质心时出现 int32 溢出与浮点消减，结果漂移甚至失真。',
    reasoning: '面积矩包含坐标乘积，既容易越过 int32 范围，也会因大基数相减损失有效精度；仅提升数据类型不能完全解决数值条件问题。',
    solution: '统一转换为 float64，并把多边形平移到局部坐标系计算面积与质心，最后再映射回全局坐标。',
    impact: '修复已随 Supervision v0.30.1 正式发布，被列入官方数值精度与稳定性修复，并在版本 Contributors 中以 Zhewen Tan（@tandede）署名；大图像、地理坐标和远离原点的多边形现在能够稳定计算质心。',
    highlight: 'LOCAL ORIGIN + FLOAT64',
    takeaway: '局部坐标加 float64，稳定计算大坐标质心',
    release: {
      label: 'v0.30.1 正式发布',
      title: 'PR #2491 已随 Supervision v0.30.1 正式发布',
      href: 'https://github.com/roboflow/supervision/releases/tag/0.30.1',
      credit: '这项多边形质心数值稳定性修复已经进入用户可安装的正式版本，并由项目方在版本说明中单独列出；Zhewen Tan（@tandede）同时出现在该版本的 Contributors 名单中。',
      steps: ['数值精度与稳定性修复', 'Release Notes 收录 PR #2491', 'Contributors 官方署名'],
    },
    visualization: 'coordinate',
  },
  {
    slug: 'funasr', name: 'FunASR', logo: '/logos/funasr.png', accent: '#5368d9', role: 'CONTRIBUTOR', href: 'https://github.com/modelscope/FunASR', prHref: 'https://github.com/modelscope/FunASR/pull/3516',
    function: '面向语音识别研究与部署的完整工具箱，支持模型训练、离线与流式推理、语音端点检测、标点恢复以及说话人日志等能力。',
    problem: '已知说话人数的大输入仍进入谱聚类，O(N²) 相似矩阵造成显著内存开销。',
    reasoning: '当 K 已知时无需通过谱结构再次估计簇数；可以依据样本规模与先验信息选择线性内存、结果可重复的固定 K 路径。',
    solution: '新增特征归一化与确定性固定 K K-means 分支，使大规模输入绕开稠密相似矩阵和谱分解。',
    impact: '显著降低长音频和大说话人片段集合的内存压力，并通过固定初始化策略提升多次运行的一致性。',
    highlight: 'NO DENSE N² MATRIX',
    takeaway: '已知 K 时绕开 O(N²) 稠密相似矩阵',
    visualization: 'routing',
  },
  {
    slug: 'burn', name: 'Burn', logo: '/logos/burn.png', accent: '#b44313', role: 'CONTRIBUTOR', href: 'https://github.com/tracel-ai/burn', prHref: 'https://github.com/tracel-ai/burn/pull/5394',
    function: '以 Rust 构建的跨平台深度学习框架，兼顾训练、推理、自动微分和多后端部署，强调类型安全、性能以及从桌面到嵌入式设备的可移植性。',
    problem: '卷积快速路径对 Inf / NaN 权重的处理与通用实现不一致，破坏 IEEE 754 语义。',
    reasoning: '不能为了修复非有限值就让所有输入回退到慢路径；正确边界只影响异常权重，有限权重仍应保留向量化优化。',
    solution: '检测非有限权重并选择语义一致的计算路径，同时让普通有限权重继续经过原有向量化热路径。',
    impact: '统一快速路径与通用路径的数值语义，在保证 Inf / NaN 正确传播的同时避免正常模型性能回退。',
    highlight: 'IEEE 754 + FAST PATH',
    takeaway: '保留卷积快速路径，同时恢复 IEEE 754 语义',
    visualization: 'numeric',
  },
  {
    slug: 'nltk', name: 'NLTK', logo: 'https://github.com/nltk.png?size=128', accent: '#154f7d', role: 'CONTRIBUTOR', href: 'https://github.com/nltk/nltk', prHref: 'https://github.com/nltk/nltk/pull/3773',
    function: '经典自然语言处理工具库，覆盖分词、词性标注、句法与语义分析、语料库接口和教学资源，为 NLP 研究、原型验证与课程实践提供稳定基础设施。',
    problem: 'chat80.Concept 的 altLabels、closures 与 extension 使用可变默认参数，多个默认构造实例会静默共享同一组容器；修改一个概念，后续概念的状态也会被污染。',
    reasoning: '根因不是 chat80 数据内容，而是 Python 默认参数只在函数定义时创建一次。三个容器跨实例复用，因此对象表面独立，底层状态实际相连；显式传入的容器则应继续保留调用者语义。',
    solution: '将三个可变默认值替换为 None 哨兵，仅在调用者未提供容器时为当前实例创建新的 list 与 set，同时保留显式传入容器，并加入双实例状态隔离回归用例。',
    impact: 'Concept 实例恢复真正的状态隔离，避免标签、闭包和扩展集合发生跨对象泄漏；修复覆盖全部三个默认容器，并作为 NLTK 贡献者写入 AUTHORS.md。',
    highlight: 'INSTANCE STATE ISOLATED',
    takeaway: '按实例创建默认容器，消除跨对象状态泄漏',
    visualization: 'shared-state',
  },
  {
    slug: 'apache-tvm', name: 'Apache TVM', logo: 'https://github.com/apache.png?size=128', accent: '#d1492e', role: 'CONTRIBUTOR', href: 'https://github.com/apache/tvm', prHref: 'https://github.com/apache/tvm/pull/20161',
    function: '面向深度学习模型的开源编译器栈，将来自 ONNX、PyTorch 等框架的计算图导入统一中间表示，并针对不同硬件完成图优化、算子生成与高性能部署。',
    problem: 'Relax ONNX 导入器没有正确区分 Reshape 的零值语义：默认模式下 `[0, 3]` 未先复制输入维度便进入 NumPy 常量折叠；`allowzero=1` 时又会触发 Relax 自身的零复制规则，无法保留字面零维。',
    reasoning: 'ONNX 的 `0` 同时受 `allowzero` 控制，而 `-1` 仍负责维度推断。特殊处理不能覆盖所有 `allowzero=1` 情况，否则没有字面零的 `[-1, 2]` 也会绕过正常推断并在运行期失败。',
    solution: '默认模式先把目标形状中的 `0` 规范化为对应输入维度再做常量折叠；仅当 `allowzero=1` 且目标形状确实含有字面零时构造 ShapeExpr，其余情况继续使用正常 Reshape 路径保留 `-1` 推断。',
    impact: '同时覆盖默认零复制、真实零维输出与动态 `-1` 推断三条路径，使 ONNX 模型语义能够忠实落到 Relax；审查中发现的推断回退也被纳入回归覆盖。',
    highlight: '0 COPY · 0 LITERAL · −1 INFER',
    takeaway: '同时保留零复制、字面零与 −1 推断语义',
    visualization: 'reshape-semantics',
  },
  {
    slug: 'torchvision', name: 'Torchvision', logo: 'https://github.com/pytorch.png?size=128', accent: '#ee4c2c', role: 'CONTRIBUTOR', href: 'https://github.com/pytorch/vision', prHref: 'https://github.com/pytorch/vision/pull/9615',
    function: 'PyTorch 官方计算机视觉库，提供主流视觉数据集、预训练模型、图像与视频变换以及高性能算子，是视觉训练和推理工作流中的核心基础设施。',
    problem: '`transforms.v2.JPEG` 支持形如 `[..., C, H, W]` 的任意前导批次维度，但内核使用 `view()` 展平批次轴；一旦输入由 transpose 等操作产生非连续布局，合法 Tensor 会在进入 JPEG 编码前直接报错。',
    reasoning: 'Tensor 的逻辑形状与底层内存是否连续是两个维度。这里需要的是保持逻辑元素顺序的展平，而不是强制要求调用方先复制；`reshape()` 在布局兼容时仍返回视图，仅在必要时才物化连续副本，正好覆盖这条语义边界。',
    solution: '将 JPEG v2 内核的前导维展平从 `view()` 改为 `reshape()`，编码完成后继续恢复原始形状；同时用转置批次轴构造真实的非连续输入，并与其 contiguous 等价输入对照，锁定多前导维场景。',
    impact: '非连续批次 Tensor 现在可以直接进入 JPEG 变换，无需用户手动调用 `.contiguous()`；原有连续输入仍沿零额外复制路径执行，接口承诺与 PyTorch 的 Tensor 布局语义重新一致。',
    highlight: 'LOGICAL SHAPE ≠ MEMORY LAYOUT',
    takeaway: '非连续批次无需手动 contiguous 也能编码 JPEG',
    visualization: 'tensor-layout',
  },
  {
    slug: 'lerobot', name: 'LeRobot', logo: 'https://github.com/huggingface.png?size=128', accent: '#d69300', role: 'CONTRIBUTOR', href: 'https://github.com/huggingface/lerobot', prHref: 'https://github.com/huggingface/lerobot/pull/4488',
    function: 'Hugging Face 面向真实机器人学习的开源平台，覆盖数据采集与可视化、机器人数据集、模仿学习策略、预训练模型和硬件接入，让端到端机器人学习更易复现与部署。',
    problem: '`aggregate_datasets` 接收一一对应的 `repo_ids` 与 `roots`，旧实现却使用非严格 `zip`；当根目录数量更少时，尾部源数据集会被静默截断，聚合任务可能在数据缺失的情况下继续完成。',
    reasoning: '两个列表共同描述同一组数据源，长度相等是公开 API 的前置不变量。依赖普通 `zip` 不仅掩盖非法输入，还会在已经读取部分数据后才暴露无关错误，因此必须在任何元信息加载前验证这条边界。',
    solution: '在聚合入口显式校验 `roots` 与 `repo_ids` 数量完全一致，不匹配时立即抛出清晰的 `ValueError`；校验通过后再使用 strict pairing，使后续实现也无法重新引入静默截断。',
    impact: '无效聚合请求在触碰数据集前就会失败，避免机器人训练数据悄然缺失、来源数量与产物不一致；合法调用保持原有行为，数据聚合链路获得可验证的完整性保证。',
    highlight: 'SILENT DROP → FAIL FAST',
    takeaway: '聚合前校验并行输入，阻止数据集被静默截断',
    visualization: 'parallel-inputs',
  },
];
