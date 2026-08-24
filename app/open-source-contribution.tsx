import type { OpenSourceProject } from './open-source-data';
import OpenSourceVisual from './open-source-visual';

type StoryHeading = { label: string; title: string };
type Presentation = { eyebrow: string; title: string; lead: string; story: [StoryHeading, StoryHeading, StoryHeading, StoryHeading] };

const presentation: Record<OpenSourceProject['visualization'], Presentation> = {
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
  </section>;
}
