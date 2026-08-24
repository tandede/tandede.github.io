export type OpenSourceProject = {
  slug: string;
  name: string;
  logo: string;
  accent: string;
  role: 'CONTRIBUTOR' | 'OWNER';
  href: string;
  prHref: string;
  function: string;
  problem: string;
  reasoning: string;
  solution: string;
  impact: string;
  highlight: string;
  visualization: 'config' | 'jaxpr' | 'reflection' | 'identity' | 'adapter' | 'axis' | 'boundary' | 'coordinate' | 'routing' | 'numeric' | 'shared-state' | 'reshape-semantics';
};

export const openSourceProjects: OpenSourceProject[] = [
  {
    slug: 'lm-evaluation-harness', name: 'LM Evaluation Harness', logo: 'https://github.com/EleutherAI.png?size=128', accent: '#313131', role: 'CONTRIBUTOR', href: 'https://github.com/EleutherAI/lm-evaluation-harness', prHref: 'https://github.com/EleutherAI/lm-evaluation-harness/pull/4020',
    function: '广泛使用的大语言模型评测框架，将任务定义、few-shot 模板、生成参数和推理后端统一到可复现流水线，支持跨模型、跨基准的标准化比较。',
    problem: '延迟注解使 dataclass 字段类型不再等同于运行时 dict，CLI 与 YAML 两条配置入口行为不一致。',
    reasoning: '定位到 f.type is dict 恒为假，核心不是某个任务的配置错误，而是两条入口没有共享同一套类型识别与规范化边界。',
    solution: '用 DICT_KEYS 统一识别字典字段，并将 YAML 字符串规范化前移到共享配置流水线，让 CLI 与纯 YAML 入口复用同一条解析路径。',
    impact: '消除入口差异导致的静默配置偏差，使任务配置在不同调用方式下保持一致，也降低后续新增字典字段时重复修补的维护成本。',
    highlight: 'ONE CONFIG PATH',
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
    visualization: 'reflection',
  },
  {
    slug: 'openai-agents-sdk', name: 'OpenAI Agents SDK', logo: '/logos/openai.png', accent: '#111827', role: 'CONTRIBUTOR', href: 'https://github.com/openai/openai-agents-python', prHref: 'https://github.com/openai/openai-agents-python/pull/4512',
    function: '面向生产级 Agent 应用的轻量编排框架，统一 Agent、Tool、Handoff、Guardrail、Tracing 与 MCP 接入，支持构建可观测的多 Agent 工作流。',
    problem: '同名 Agent、Tool 与 MCP Server 以显示名为键，导致 Graphviz 合并节点或产生伪自环。',
    reasoning: '显示名称服务于阅读，但不能承担实体身份；图遍历、节点注册和边生成需要共享稳定的唯一标识，同时保留原始名称作为可读标签。',
    solution: '以对象身份注册节点，把显示名降为 label，并重构遍历与边生成链路，确保不同类型或不同实例即使同名也不会被错误合并。',
    impact: '生成的工作流图能够真实表达实体关系，避免错误节点、漏边和伪自环影响调试与架构理解。',
    highlight: 'IDENTITY ≠ LABEL',
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
    visualization: 'boundary',
  },
  {
    slug: 'supervision', name: 'Supervision', logo: '/logos/supervision.png', accent: '#6f3ea3', role: 'CONTRIBUTOR', href: 'https://github.com/roboflow/supervision', prHref: 'https://github.com/roboflow/supervision/pull/2491',
    function: '面向计算机视觉工程的通用工具库，覆盖检测结果表示、几何计算、标注渲染、视频跟踪与数据集处理，连接模型输出与业务分析。',
    problem: '大坐标多边形计算质心时出现 int32 溢出与浮点消减，结果漂移甚至失真。',
    reasoning: '面积矩包含坐标乘积，既容易越过 int32 范围，也会因大基数相减损失有效精度；仅提升数据类型不能完全解决数值条件问题。',
    solution: '统一转换为 float64，并把多边形平移到局部坐标系计算面积与质心，最后再映射回全局坐标。',
    impact: '在大图像、地理坐标和远离原点的多边形上获得稳定结果，同时保持普通坐标场景的兼容性。',
    highlight: 'FLOAT64 + LOCAL ORIGIN',
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
    visualization: 'reshape-semantics',
  },
];
