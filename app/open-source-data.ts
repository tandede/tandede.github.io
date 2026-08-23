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
  validation: string;
  files: string[];
  visualization: 'config' | 'jaxpr' | 'reflection' | 'identity' | 'adapter' | 'axis' | 'boundary' | 'coordinate' | 'routing' | 'numeric';
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
    validation: '公开入口回归覆盖 CLI+YAML 与纯 YAML；70 项专项测试、613 项广泛测试通过，Python 3.10/3.11/3.12 CPU CI 与 lint 全部通过。',
    files: ['lm_eval/config/evaluate_config.py', 'tests/test_cli_subcommands.py'],
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
    validation: 'JAX 0.11.1 环境 415 项通过、4 项跳过；最低支持版 JAX 0.7.0 完整 ops 测试 337 项通过，32 项基准无显著性能回退。',
    files: ['numpyro/ops/provenance.py', 'test/ops/test_provenance.py'],
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
    validation: '差分验证 20,010 个普通输入组合，并覆盖 INT_MIN / INT_MAX 的 12 个极端案例；ASan、UBSan 与跨平台 CI 全部通过。',
    files: ['modules/core/src/copy.cpp', 'modules/core/test/test_misc.cpp'],
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
    validation: '19 项可视化专项测试全部通过，覆盖跨类型重名、同名 Agent、转义碰撞、保留名与真实循环；完整格式、类型和测试检查通过。',
    files: ['src/agents/extensions/visualization.py', 'tests/test_visualization.py'],
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
    validation: '用原配置对象与完整 state_dict 逐项验证失败原子性；127 项针对性测试与 1,317 项扩展测试通过，Linux/Windows 多版本 CI 通过。',
    files: ['src/peft/peft_model.py', 'src/peft/mixed_model.py', 'tests/test_custom_models.py', 'tests/testing_common.py'],
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
    validation: '覆盖 boxes 与 coords 两条消费路径、嵌套 ratio_pad 和 scale_fill 非等比例场景；相关 Python 测试 134 项全部通过。',
    files: ['ultralytics/data/augment.py', 'ultralytics/utils/ops.py', 'tests/test_python.py'],
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
    validation: '确定性回归覆盖单框和批量生成；20 万次固定种子抽样的最大偏差约 0.162 个百分点，30 项相关测试与 440 项扩展测试通过。',
    files: ['timm/data/mixup.py', 'tests/test_data.py'],
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
    validation: '回归覆盖百万级 int32、万亿级 int64 偏移和零面积多边形；项目完整测试 3,575 项通过、20 项跳过，pre-commit 全部通过。',
    files: ['src/supervision/geometry/utils.py', 'tests/geometry/test_utils.py', 'docs/changelog.md'],
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
    validation: '10,639 × 192 的模拟 embedding、K=2 在 CPU 上约 0.098 秒完成；边界路由与真实聚类结果均有独立回归测试。',
    files: ['funasr/models/campplus/cluster_backend.py', 'tests/test_cluster_backend.py'],
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
    validation: '覆盖小通道、通用和 depthwise 三类分发路径与通道隔离；391 项默认测试、331 项 std 测试和 19 项后端卷积测试通过。',
    files: ['crates/burn-flex/src/ops/conv.rs'],
    visualization: 'numeric',
  },
];
