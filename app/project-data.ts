export type FeaturedProject = {
  slug: string;
  index: string;
  title: string;
  cardTitle?: string;
  subtitle: string;
  href: string;
  paperHref: string;
  accent: string;
  intro: string;
  problem: string;
  approach: string;
  contribution: string;
  result: string;
  highlight: string;
  metrics: Array<[string, string]>;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: 'tiny-r1-32b',
    index: '01',
    title: 'Tiny-R1-32B 领域推理模型',
    cardTitle: 'Tiny-R1-32B',
    subtitle: 'Branch–Merge Distillation',
    href: 'https://huggingface.co/qihoo360/TinyR1-32B',
    paperHref: 'https://huggingface.co/qihoo360/TinyR1-32B',
    accent: '#155eef',
    intro: '面向数学、代码与科学推理的 32B 领域增强模型：先训练各自专精的领域分支，再把互补能力合并回同一模型，降低多领域混训中的相互干扰。',
    problem: '多领域数据直接混合训练容易产生梯度干扰：某一领域能力提升的同时，其他推理能力或通用指令遵循可能回退。如何在有限训练预算下保留各领域专家的推理模式，是模型构建的核心问题。',
    approach: '采用 Branch–Merge Distillation。首先按数学、代码、科学划分高质量 CoT 数据并分别训练领域专家，再在统一评测体系下分析各分支的真实增益，最后通过参数融合搜索把互补能力合并到同一模型。',
    contribution: '我参与领域 CoT 数据收集、清洗与质量筛选，完成数学、代码、科学专家训练与离线评测；在合并阶段参与融合权重选择，重点检查单领域增益是否稳定，以及合并后是否出现能力回退。',
    result: '最终模型在 AIME24、AIME25、GPQA、LiveCodeBench 与 IFEval 上形成覆盖推理能力和指令遵循的完整结果，验证了“领域分支训练—统一评测—参数合并”的多领域增强路径。',
    highlight: 'SPECIALIZE → EVALUATE → MERGE',
    metrics: [['AIME24', '90.9'], ['AIME25', '82.7'], ['GPQA', '69.4'], ['LCB', '70.4'], ['IFEval', '89.2']],
  },
  {
    slug: 'tiny-r1-safety-8b',
    index: '02',
    title: 'TinyR1-Safety-8B',
    subtitle: 'Magic-Token Safety Control',
    href: 'https://huggingface.co/qihoo360/TinyR1-Safety-8B',
    paperHref: 'https://arxiv.org/abs/2508.14904',
    accent: '#7c3aed',
    intro: '在单个 8B 模型中统一学习正向引导、风险暴露与审慎拒答等安全行为，并通过 Magic Token 在推理时切换行为与地区策略。',
    problem: '传统安全对齐经常把“安全”简化成统一拒答：模型虽然降低了风险，却也失去建设性帮助能力；多阶段 SFT 与偏好优化还会增加训练成本，并且部署后难以按场景切换安全策略。',
    approach: '先对多种安全行为进行数据自蒸馏，再把正向引导、风险暴露与拒答行为放入同一阶段协同训练。使用轻量 Magic Token 对行为模式和中英文地区策略进行条件控制，让一个模型在推理时选择不同安全边界。',
    contribution: '我参与多安全行为训练数据的构建、清洗与质量筛选，并参与协同训练与安全评测；围绕“风险—拒答—建设性帮助”三级标准分析模型输出，检查不同控制信号是否真正形成可分离、可切换的安全行为。',
    result: '模型在 13 个公开安全基准上的 Constructive Safety 平均分达到 97.7，并在中英文场景中保持稳定表现；安全控制从固定拒答策略变成了可在推理阶段调用的模型能力。',
    highlight: 'SAFE ≠ REFUSE · CONTROL AT INFERENCE',
    metrics: [['Safety Avg', '97.7'], ['AdvBench', '99.0'], ['HarmfulQA', '100'], ['S-Eval Attack', '95.0'], ['StrongREJECT', '96.3']],
  },
  {
    slug: 'harness-bench',
    index: '03',
    title: 'Harness-Bench',
    subtitle: 'Agent Harness Evaluation',
    href: 'https://www.harness-bench.ai/',
    paperHref: 'https://arxiv.org/abs/2605.27922',
    accent: '#19a974',
    intro: '系统评估不同 Agent Harness 如何改变模型的任务成功率、Token 成本与失败模式，把“外壳差异”转化为可复现的实验结论。',
    problem: '同一个模型接入不同 Harness 后，提示组织、工具协议、状态管理与失败恢复都会变化。只比较最终成功率无法解释差异来自模型还是系统，也无法定位长程执行中真正的失败环节。',
    approach: '在固定任务、模型池、预算与超时条件下，构建 6 类 Harness × 8 个模型后端的对照矩阵。所有运行保留原生提示、工具调用、状态转换与恢复行为，并结合可执行 Oracle 和 LLM Rubric 评分。',
    contribution: '我参与 106 个离线沙箱任务的环境与评测链路建设，汇总并分析 5,194 条完整执行轨迹；从配置层追踪任务失败、Token 消耗和长程行为差异，使实验可以被复现并支持 Harness 级诊断。',
    result: '项目把 Harness 从被忽略的工程实现提升为独立评测变量：不仅回答“哪个组合成功率更高”，还能够说明差异发生在哪类任务、哪一步工具调用，以及付出了多少执行成本。',
    highlight: 'SAME MODEL · DIFFERENT SYSTEM',
    metrics: [['离线任务', '106'], ['执行轨迹', '5,194'], ['Harness×Model', '6 × 8']],
  },
];
