import type { OpenSourceProject } from './open-source-data';
import OpenSourceVisual from './open-source-visual';

const presentation: Record<OpenSourceProject['visualization'], { eyebrow: string; title: string; lead: string }> = {
  reflection: { eyebrow: 'INTEGER SAFETY · CORE ALGORITHM', title: '把十亿次折返压成一次映射', lead: '极端坐标不是普通边界值，而是同时触发整数安全和算法复杂度的压力测试。' },
  routing: { eyebrow: 'SPEAKER DIARIZATION · SCALING', title: '让已知 K 真正成为有用的信息', lead: '样本规模决定能不能算，K 是否已知决定应该怎么算；两个维度共同决定聚类路径。' },
  identity: { eyebrow: 'AGENT GRAPH · IDENTITY MODEL', title: '同名，不应该意味着同一个实体', lead: '显示名称用于阅读，稳定身份用于建图。把两者拆开，图才能忠实表达真实工作流。' },
  adapter: { eyebrow: 'MODEL STATE · ATOMICITY', title: '在修改权重之前拒绝非法状态', lead: '重复名称不是一个普通输入错误，它可能静默覆盖已经训练的 Adapter。' },
  axis: { eyebrow: 'VISION PIPELINE · COORDINATE SYSTEM', title: '两个轴，必须分别回到原图', lead: '非等比例预处理打破了单一缩放系数假设，逆变换必须沿完整数据链逐轴还原。' },
  boundary: { eyebrow: 'DATA AUGMENTATION · DISTRIBUTION', title: '补回训练中永远缺席的边界位置', lead: '两行 off-by-one 不会让程序崩溃，却会长期改变 CutMix 的空间采样分布。' },
  coordinate: { eyebrow: 'NUMERICAL GEOMETRY · STABILITY', title: '先回到局部坐标，再计算几何量', lead: '平移不改变多边形质心，却能同时避开整数溢出和大数相减造成的精度损失。' },
  config: { eyebrow: 'EVALUATION INFRA · CONFIGURATION', title: '让两种配置入口走同一条路', lead: 'CLI 和 YAML 表达方式不同，但进入评测系统前应该被规范化成完全相同的数据结构。' },
  jaxpr: { eyebrow: 'PROBABILISTIC PROGRAMMING · JAXPR', title: '从私有追踪假设回到公共接口', lead: '闭包常量参与计算，却不应占据显式参数的 provenance 位置。' },
  numeric: { eyebrow: 'RUST TENSOR KERNEL · IEEE 754', title: '保住快速路径，也保住浮点语义', lead: '常见有限权重继续走向量化热路径，只有非有限值和 padding 同时出现时才精确修正。' },
};

export default function OpenSourceContribution({ project }: { project: OpenSourceProject }) {
  const copy = presentation[project.visualization];
  return <section className={`contribution-case case-${project.visualization}`} id="contribution">
    <header className="case-header"><span>{copy.eyebrow}</span><h2>{copy.title}</h2><p>{copy.lead}</p></header>
    <div className="case-visual"><OpenSourceVisual kind={project.visualization} /></div>
    <div className="case-story">
      <article><small>问题</small><h3>哪里出了错</h3><p>{project.problem}</p></article>
      <article><small>我的修改</small><h3>如何解决</h3><p>{project.solution}</p></article>
      <article><small>结果</small><h3>带来了什么</h3><p>{project.impact}</p></article>
    </div>
  </section>;
}
