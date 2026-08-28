import type { OpenSourceProject } from './open-source-data';
import OpenSourceVisual from './open-source-visual';
import { PiArrowUpRightBold, PiConfettiBold } from 'react-icons/pi';

type StoryHeading = { label: string; title: string };
type Presentation = { eyebrow: string; title: string; lead: string; story: [StoryHeading, StoryHeading, StoryHeading, StoryHeading] };

const presentation: Record<OpenSourceProject['visualization'], Presentation> = {
  'caller-immutability': { eyebrow: 'GEMINI REQUEST PIPELINE · INPUT OWNERSHIP', title: '补全请求参数，不代表可以改写调用者的配置', lead: '外层字典被复制后，嵌套映射仍可能指向同一个对象；真正的输入隔离必须切断这条别名关系。', story: [{ label: '隐蔽副作用', title: '默认阈值写回了调用方字典' }, { label: '对象边界', title: '浅拷贝没有隔离嵌套映射' }, { label: '安全合并', title: '先复制 safety settings，再应用默认值' }, { label: '上游采用', title: '代码、测试与原 PR 署名进入主分支' }] },
  reflection: { eyebrow: 'INTEGER SAFETY · CORE ALGORITHM', title: '把十亿次折返压成一次映射', lead: '极端坐标不是普通边界值，而是同时触发整数安全和算法复杂度的压力测试。', story: [{ label: '极端输入', title: '坐标越远，旧算法越慢' }, { label: '关键判断', title: '反射本质上是周期函数' }, { label: '算法改写', title: '在 int64 域内直接求模' }, { label: '复杂度', title: '从 O(N) 收敛到 O(1)' }] },
  routing: { eyebrow: 'SPEAKER DIARIZATION · SCALING', title: '让已知 K 真正成为有用的信息', lead: '样本规模决定能不能算，K 是否已知决定应该怎么算；两个维度共同决定聚类路径。', story: [{ label: '内存瓶颈', title: '大样本不该生成稠密矩阵' }, { label: '可用先验', title: '已知 K 已经改变了问题' }, { label: '三路分流', title: '按规模与先验选择算法' }, { label: '运行结果', title: '长音频走上线性内存路径' }] },
  identity: { eyebrow: 'AGENT GRAPH · IDENTITY MODEL', title: '同名，不应该意味着同一个实体', lead: '显示名称用于阅读，稳定身份用于建图。把两者拆开，图才能忠实表达真实工作流。', story: [{ label: '错误现象', title: '节点被合并，边变成自环' }, { label: '建模判断', title: 'Label 只能负责可读性' }, { label: '身份重构', title: '实体 ID 贯穿遍历与建边' }, { label: '图的语义', title: '可视化重新对应真实工作流' }] },
  adapter: { eyebrow: 'MODEL STATE · ATOMICITY', title: '在修改权重之前拒绝非法状态', lead: '重复名称不是一个普通输入错误，它可能静默覆盖已经训练的 Adapter。', story: [{ label: '危险边界', title: '重复名称会触碰已有权重' }, { label: '原子性', title: '失败必须发生在修改之前' }, { label: '前置闸门', title: '先校验唯一性，再注入层' }, { label: '模型状态', title: '错误请求不再留下半成品' }] },
  axis: { eyebrow: 'VISION PIPELINE · COORDINATE SYSTEM', title: '两个轴，必须分别回到原图', lead: '非等比例预处理打破了单一缩放系数假设，逆变换必须沿完整数据链逐轴还原。', story: [{ label: '漂移来源', title: '一个 gain 无法描述两个轴' }, { label: '数据链', title: '缩放与留白必须一起追踪' }, { label: '逆变换', title: 'x / y 分别恢复比例与偏移' }, { label: '几何一致性', title: '预测框重新贴合原始图像' }] },
  boundary: { eyebrow: 'DATA AUGMENTATION · DISTRIBUTION', title: '补回训练中永远缺席的边界位置', lead: '两行 off-by-one 不会让程序崩溃，却会长期改变 CutMix 的空间采样分布。', story: [{ label: '隐形偏差', title: '右边和下边从未被采到' }, { label: '区间语义', title: '离散坐标上界需要包含端点' }, { label: '边界修正', title: '让全部合法起点进入采样' }, { label: '训练分布', title: '空间覆盖重新保持完整' }] },
  coordinate: { eyebrow: 'NUMERICAL GEOMETRY · STABILITY', title: '先回到局部坐标，再计算几何量', lead: '平移不改变多边形质心，却能同时避开整数溢出和大数相减造成的精度损失。', story: [{ label: '大数问题', title: '坐标乘积放大溢出与消减' }, { label: '不变量', title: '质心对平移保持等价' }, { label: '局部计算', title: 'float64 坐标先减去原点' }, { label: '适用范围', title: '万亿级偏移仍保持稳定' }] },
  config: { eyebrow: 'EVALUATION INFRA · CONFIGURATION', title: '让两种配置入口走同一条路', lead: 'CLI 和 YAML 表达方式不同，但进入评测系统前应该被规范化成完全相同的数据结构。', story: [{ label: '入口分裂', title: '同一字段得到两种运行时类型' }, { label: '根因定位', title: '延迟注解破坏了身份判断' }, { label: '统一边界', title: 'DICT_KEYS 成为单一事实来源' }, { label: '配置语义', title: 'CLI 与 YAML 得到同样结果' }] },
  jaxpr: { eyebrow: 'PROBABILISTIC PROGRAMMING · JAXPR', title: '从私有追踪假设回到公共接口', lead: '闭包常量参与计算，却不应占据显式参数的 provenance 位置。', story: [{ label: '版本变化', title: '闭包常量进入了输入序列' }, { label: '错位本质', title: '私有 API 隐藏了布局假设' }, { label: '公共接口', title: 'ClosedJaxpr 显式拆分常量' }, { label: '长期兼容', title: 'Provenance 再次准确对齐' }] },
  numeric: { eyebrow: 'RUST TENSOR KERNEL · IEEE 754', title: '保住快速路径，也保住浮点语义', lead: '常见有限权重继续走向量化热路径，只有非有限值和 padding 同时出现时才精确修正。', story: [{ label: '路径差异', title: '快速卷积改变了 Inf / NaN 行为' }, { label: '性能边界', title: '异常值不能拖慢普通输入' }, { label: '条件分发', title: '只让罕见组合走修正路径' }, { label: '语义一致', title: '速度与 IEEE 754 同时保留' }] },
  'shared-state': { eyebrow: 'PYTHON OBJECT MODEL · STATE ISOLATION', title: '看似独立的对象，不该共享同一份状态', lead: '可变默认参数只创建一次。两个 Concept 实例如果拿到同一个容器，一次局部修改就会变成跨对象污染。', story: [{ label: '状态泄漏', title: '三个默认容器跨实例复用' }, { label: '语言语义', title: '默认参数在定义时创建一次' }, { label: '初始化边界', title: 'None 哨兵按实例分配容器' }, { label: '兼容结果', title: '隔离默认状态，保留显式输入' }] },
  'reshape-semantics': { eyebrow: 'ML COMPILER · ONNX SEMANTICS', title: '同一个 0，在不同模式下代表不同形状', lead: '编译器不能只看到一个整数零；它还必须知道 ONNX 的 allowzero 规则，并且不能破坏 `-1` 原有的维度推断。', story: [{ label: '语义冲突', title: 'ONNX 与 Relax 对 0 的解释不同' }, { label: '边界识别', title: 'allowzero 只改变字面零语义' }, { label: '三路分发', title: '复制、保留与推断各走其路' }, { label: '回归结果', title: '零维输出与 −1 推断同时成立' }] },
  quaternion: { eyebrow: 'ROBOTICS SIMULATION · ROTATION MATH', title: '让两种恒等四元数落到同一个有限结果', lead: 'q 与 −q 表示同一个旋转；数值转换不能因为标量符号不同，就把合法恒等姿态变成 NaN。', story: [{ label: '崩溃入口', title: '零向量归一化产生 NaN 旋转轴' }, { label: '旋转语义', title: 'q 与 −q 在 SO(3) 中完全等价' }, { label: '退化分支', title: '近零向量直接返回规范恒等旋转' }, { label: '上游协作', title: '从贡献修复到 Committer 身份' }] },
  'tensor-layout': { eyebrow: 'PYTORCH VISION · TENSOR LAYOUT', title: '让 JPEG 变换理解非连续批次', lead: '转置改变的是 Tensor 的 stride，不是它作为图像批次的合法性；变换内核应该处理这种布局差异，而不是把约束转嫁给调用方。', story: [{ label: '合法输入', title: '任意前导维不等于连续内存' }, { label: '算子语义', title: 'view 要求连续，reshape 保持逻辑顺序' }, { label: '内核修复', title: '仅在必要时物化连续布局' }, { label: '接口结果', title: 'JPEG 直接接受转置后的批次' }] },
  'parallel-inputs': { eyebrow: 'ROBOT DATA · AGGREGATION INTEGRITY', title: '聚合不能以静默丢失数据为代价', lead: '机器人数据集的来源与本地根目录必须逐项对应；如果输入结构已经不完整，系统应该在读取第一份数据之前明确拒绝。', story: [{ label: '静默缺失', title: '普通 zip 截掉最后的数据集' }, { label: '数据契约', title: '两组并行参数必须等长' }, { label: '入口闸门', title: '加载元信息前先验证完整性' }, { label: '聚合结果', title: '每个来源都有唯一对应根目录' }] },
  zenflow: { eyebrow: 'DISTRIBUTED TRAINING · ZENFLOW', title: '把除零、空选择和错配挡在训练之前', lead: '两个除数、两条更新路径和一组分区缓冲区必须共享同一套配置与尺寸边界。', story: [{ label: '迟发故障', title: '非法值在训练启动后才爆炸' }, { label: '路径审计', title: '自动与显式更新各有一个除数' }, { label: '分区不变量', title: '选择数与缓冲区必须同源' }, { label: '训练边界', title: '错误配置早失败，小比例仍可运行' }] },
  'operational-acceleration': { eyebrow: 'ROBOT DYNAMICS · OPERATIONAL SPACE', title: '让关节动力学正确落到末端六维加速度', lead: '这里不是把一个 NameError 换成能运行的表达式，而是重新接通从操作空间速度、解析雅可比到末端加速度的完整动力学关系。', story: [{ label: '运行故障', title: '公开方法引用了从未定义的矩阵' }, { label: '动力学关系', title: '加速度需要雅可比及其时间导数' }, { label: '维度修复', title: '末端输出始终属于六维操作空间' }, { label: '机器人覆盖', title: '6 轴与冗余 7 轴模型都能正确执行' }] },
  'obj-whitespace': { eyebrow: 'C++ STREAM PARSING · OBJ FORMAT', title: '让每个面片顶点都停在正确的 token 边界', lead: '格式化提取已经理解全部空白符；再去寻找一个字面空格，只会把合法输入继续向后吞。', story: [{ label: '解析故障', title: '非空格分隔符后仍继续扫描' }, { label: '根因判断', title: '两套分隔逻辑争夺同一输入流' }, { label: '最小修复', title: '让 operator>> 成为唯一提取路径' }, { label: '格式覆盖', title: '面片、续行与 v/vt/vn 全部保留' }] },
  'empty-index': { eyebrow: 'VECTOR SEARCH · RESULT CONTRACT', title: '零个数据库向量，也必须返回完整结果', lead: '空索引不是“什么都不用做”；对每个查询来说，它仍然必须写出距离哨兵值和明确的无结果标签。', story: [{ label: '规模分叉', title: '大批次进入 BLAS 后输出反而失效' }, { label: '根因定位', title: '提前返回绕过了结果处理器生命周期' }, { label: '路径修复', title: '空索引统一进入可完成初始化的路径' }, { label: '契约覆盖', title: '两种度量与三类处理器全部锁定' }] },
  'fixed-lag-pending': { eyebrow: 'FACTOR GRAPH · FIXED-LAG LIFECYCLE', title: '值可以先到，因子可以晚到', lead: '等待连接的 value 既不能提前删除，也不能在过期后被送进一个要求 Bayes-tree clique 的边缘化路径。', story: [{ label: '异步输入', title: 'Value 已存在，Factor 仍在路上' }, { label: '状态区分', title: 'Pending 与 Connected 必须分流' }, { label: '时窗语义', title: '时窗内保留，过期后完整回收' }, { label: '图结构安全', title: '无 Clique 的变量不再进入边缘化' }] },
  'gjk-simplex': { eyebrow: 'COLLISION DETECTION · GJK SIMPLEX', title: '被拒绝的支撑点，不能参与接触重建', lead: '一次没有带来更近解的试探点，如果继续留在单纯形里，就会把微小接触放大成数米级穿透。', story: [{ label: '异常结果', title: '不到一厘米的投射得到 7.25 米穿透' }, { label: '几何根因', title: '无效点构成近退化三角形' }, { label: '状态回退', title: '失败返回前恢复上一个有效单纯形' }, { label: '跨平台验证', title: '接触深度与确定性同时锁定' }] },
  'frustum-culling': { eyebrow: 'DIFFERENTIABLE RENDERING · FRUSTUM CULLING', title: '判断面片出界，要看三个顶点的同一坐标', lead: '一次维度索引错位同时混淆了 vertex 与 xyz；真正启用剔除后，还必须守住透视相机平面的几何边界。', story: [{ label: '张量语义', title: '[F, vertex, xyz] 的两个轴不能互换' }, { label: '剔除条件', title: '三个顶点必须越过同一个平面' }, { label: '透视边界', title: '跨越相机平面的面片交给 Z clipping' }, { label: '验证规模', title: '六平面、三顺序与 4,096 个随机三角形' }] },
  'ui-lifecycle': { eyebrow: 'DESKTOP SLAM · GUI RESOURCE LIFECYCLE', title: '没有任务，就不应该留下进度窗口', lead: '一个对话框何时创建，决定错误返回之后是否还会残留孤立的 UI 资源。', story: [{ label: '无效请求', title: '三个检测入口同时不可用' }, { label: '顺序错误', title: '先显示窗口，再发现任务不能开始' }, { label: '前置闸门', title: '校验支配资源创建与生命周期' }, { label: '行为边界', title: '错误路径归零，正常路径完全不变' }] },
  'matrix-codegen': { eyebrow: 'SYMBOLIC CODEGEN · RUST TYPE SYSTEM', title: '六个元素，不代表它就是六维向量', lead: '生成代码不仅要保留数值，还必须把符号矩阵的行列结构带进目标语言的静态类型。', story: [{ label: '形状丢失', title: '2×3 被压平成 SVector<6>' }, { label: '类型语义', title: '元素数量不能替代行列维度' }, { label: '路径统一', title: '签名与构造器共享 shape-aware formatter' }, { label: '回归边界', title: '矩阵恢复形状，向量保持原行为' }] },
};

export default function OpenSourceContribution({ project }: { project: OpenSourceProject }) {
  const copy = presentation[project.visualization];
  const paragraphs = [project.problem, project.reasoning, project.solution, project.impact];
  return <section className={`contribution-case case-${project.visualization}`} id="contribution">
    <header className="case-header"><span>{copy.eyebrow}</span><h2>{copy.title}</h2><p>{copy.lead}</p></header>
    <div className="case-visual" data-motion data-glow><OpenSourceVisual kind={project.visualization} /></div>
    <div className="case-story" data-motion>
      {copy.story.map((item, index) => <article key={item.title} data-glow><small>{item.label}</small><h3>{item.title}</h3><p>{paragraphs[index]}</p></article>)}
    </div>
    {project.release && <a className="contribution-release" href={project.release.href} target="_blank" rel="noopener noreferrer" data-motion data-glow>
      <span className="release-celebration"><PiConfettiBold aria-hidden="true" /></span>
      <div className="release-copy"><small>CONTRIBUTION SHIPPED</small><strong>{project.release.title}</strong><p>{project.release.credit}</p><ul>{project.release.steps.map((step) => <li key={step}>{step}</li>)}</ul></div>
      <span className="release-link">查看正式版本 <PiArrowUpRightBold aria-hidden="true" /></span>
    </a>}
  </section>;
}
