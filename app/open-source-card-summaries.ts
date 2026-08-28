export type OpenSourceCardSummary = {
  problem: string;
  reasoning: string;
  solution: string;
};

export const openSourceCardSummaries: Record<string, OpenSourceCardSummary> = {
  webots: {
    problem: '负单位四元数表示恒等旋转，却会走到零向量归一化，生成 NaN 旋转轴并把崩溃风险带入场景树。',
    reasoning: 'q 与 −q 描述同一旋转；近零向量应规范化为有限的恒等轴角，同时保留非退化负标量输入的真实旋转。',
    solution: '统一复用向量范数，近零时直接返回规范恒等旋转，其余输入继续正常归一化，并补齐退化边界记录。',
  },
  'robotics-toolbox-python': {
    problem: '`accel_x()` 会引用未定义变量，并把关节数误当作输出列数，让 7 轴机器人无法返回六维末端加速度。',
    reasoning: '末端加速度必须同时包含雅可比导数项与关节加速度映射，且输出维度始终属于六维操作空间。',
    solution: '复用解析雅可比及其导数，恢复 `xdd = J̇a q̇ + Ja q̈`，并统一单点与轨迹输出形状。',
  },
  simbody: {
    problem: 'OBJ 解析在读取 token 后又查找字面空格，遇到 Tab、换页符等合法空白时会吞掉后续顶点。',
    reasoning: '格式化流已经完整处理所有空白边界；额外分隔规则不仅重复，还破坏了 `v/vt/vn` 三元组的完整性。',
    solution: '移除冗余的空格查找，让格式化提取成为唯一入口，并用混合空白与续行面片锁定行为。',
  },
  faiss: {
    problem: '空索引在 BLAS 路径中提前返回，距离与标签缓冲区没有写入哨兵值，可能泄露调用方残留数据。',
    reasoning: '空搜索仍是定义明确的接口；不同 result handler 必须完成初始化，而不是跳过整个处理生命周期。',
    solution: '将空数据库送入顺序处理路径，覆盖内积、L2 与三类 handler，保证所有槽位写出中性距离和 −1。',
  },
  gtsam: {
    problem: '先写入 value、后到达 factor 的 pending key 没有索引或 clique，过期时却被送进叶节点边缘化并失败。',
    reasoning: '尚未连接与已经失效是两种状态；窗口内要等待迟到 factor，真正过期后才能安全回收。',
    solution: '按 active、connected 与 pending 拆分键：已连接者正常边缘化，未连接且过期者直接清理完整状态。',
  },
  'jolt-physics': {
    problem: 'GJK 收敛失败后仍保留被拒绝的支撑点，接触重建形成近退化单纯形，并报告数米级假穿透。',
    reasoning: '最后的试探点没有改善最近距离，就不属于有效单纯形；接受命中时必须回到加入它之前的几何状态。',
    solution: '失败返回前弹出无效支撑点，只用最后一个有效单纯形重建接触，并以圆柱—胶囊案例锁定微小误差。',
  },
  pytorch3d: {
    problem: '视锥剔除把坐标轴当成顶点轴，实际检查的是一个顶点的三个坐标，而非三个顶点是否同在平面外。',
    reasoning: '只有三顶点位于同一裁剪平面外才能删除；跨越相机平面的透视三角形还必须避免 XY 镜像误剔除。',
    solution: '沿坐标维读取并聚合顶点维，再用前方深度掩码约束透视 XY 剔除，补齐六平面与投影回归。',
  },
  rtabmap: {
    problem: '无效检测选项在校验前就创建进度对话框；警告后提前返回，留下无法推进也无法收尾的孤立窗口。',
    reasoning: '进度 UI 代表有效任务已经开始，生命周期应由工作路径管理；前置条件失败时根本不该分配它。',
    solution: '把所有校验移到窗口创建之前，非法请求只显示警告，合法任务继续沿用原有进度与取消行为。',
  },
  symforce: {
    problem: 'Rust codegen 把所有矩阵压成向量，`2×3` 返回值变成六元素 `SVector`，静态形状语义完全丢失。',
    reasoning: '元素数量相同不代表类型等价；函数签名和返回构造器必须共享同一套 shape-aware 判断。',
    solution: '统一使用现有 `format_typename`，让非方阵生成 `SMatrix`，列向量继续保持 `SVector`。',
  },
  'lm-evaluation-harness': {
    problem: '延迟注解改变了 dataclass 字段的运行时类型表现，使 CLI 与 YAML 对字典配置产生不一致解析。',
    reasoning: '根因不是单个任务配置，而是两条入口缺少共享的类型识别和规范化边界，新增字段还会重复踩坑。',
    solution: '集中识别字典字段，并把 YAML 字符串规范化前移到公共流水线，让所有入口复用同一解析路径。',
  },
  numpyro: {
    problem: 'JAX 升级后闭包常量进入 jaxpr 输入序列，provenance 的动态参数与变量映射发生整体错位。',
    reasoning: '旧实现依赖私有 tracing API 的常量布局；常量与动态输入必须在稳定公共接口上显式分离。',
    solution: '改用 `jax.make_jaxpr` 获取 ClosedJaxpr，拆分常量和动态输入，再重建 provenance 映射。',
  },
  opencv: {
    problem: '极端反射坐标依靠逐次修正，不仅会触发整数溢出，还可能执行十亿级循环。',
    reasoning: '反射边界本质是固定周期映射，无需模拟每一次折返；在宽整数域求周期位置即可直接定位结果。',
    solution: '将循环改写为 int64 周期模运算，并覆盖负坐标与短边界，把最坏复杂度从 O(N) 降到 O(1)。',
  },
  deepspeed: {
    problem: 'ZenFlow 未约束 `topk_ratio` 与 `update_interval`，非法值会触发除零，小分区还可能因截断空选。',
    reasoning: '自动与显式更新必须共享配置边界；选择数、索引缓冲区与梯度缓冲区也应复用同一分区公式。',
    solution: '严格校验比例和更新间隔；空分区保持 0，非空分区至少选择一列，并统一两条选择与分配路径。',
  },
  'openai-agents-sdk': {
    problem: '同名 Agent、Tool 与 MCP Server 以显示名作为键，Graphviz 会合并不同实体并制造伪自环。',
    reasoning: '名称服务于阅读，不等于对象身份；遍历、注册与连边必须共享稳定唯一标识，再保留名称作为标签。',
    solution: '以对象身份注册节点、以原名显示 label，并重构遍历和边生成，使同名实例仍保持独立关系。',
  },
  peft: {
    problem: '重复 `adapter_name` 会静默覆盖配置并再次注入层，让已有训练权重处于不可预测的部分更新状态。',
    reasoning: '这是状态原子性边界：若检查发生在突变之后，即使抛出错误，也无法保证模型安全回退。',
    solution: '把唯一性校验前移到所有模型和配置修改之前，冲突立即失败，并确认既有 Adapter 保持原样。',
  },
  'ultralytics-yolo': {
    problem: '非等比例 resize 与 LetterBox 组合后仍使用单一 gain 还原坐标，预测框无法准确回到原图。',
    reasoning: 'x、y 轴经历了不同缩放与留白；逆变换必须沿完整预处理链分别恢复每个轴。',
    solution: '组合前置 resize 与 LetterBox 参数，按双轴比例和 padding 逐轴还原检测、分割等任务坐标。',
  },
  timm: {
    problem: 'CutMix minmax 的随机上界使用排除语义，最右侧和最下方的合法裁剪起点永远不会被采到。',
    reasoning: '这类 off-by-one 不会直接报错，却会在长期训练中形成稳定的空间分布偏差，削弱边界覆盖。',
    solution: '修正离散采样上界并补齐边界回归，让所有合法起点重新进入同一均匀分布。',
  },
  supervision: {
    problem: '大坐标多边形计算质心时同时遭遇 int32 溢出和浮点消减，结果会明显漂移甚至失真。',
    reasoning: '面积矩包含大坐标乘积，仅提升类型仍不足；把几何平移到局部原点才能改善数值条件。',
    solution: '统一转换为 float64，在局部坐标系计算面积与质心，再映射回全局；修复已随 v0.30.1 发布。',
  },
  funasr: {
    problem: '已知说话人数的大输入仍进入谱聚类，构造 O(N²) 相似矩阵，长音频会产生显著内存压力。',
    reasoning: 'K 已知时无需再次估计簇数，应按先验直接选择线性内存、可重复的固定 K 聚类路径。',
    solution: '新增特征归一化与确定性 K-means 分支，让大规模输入绕开稠密矩阵和谱分解。',
  },
  burn: {
    problem: '卷积快速路径对 Inf / NaN 权重的行为与通用实现不同，破坏同一算子的 IEEE 754 语义。',
    reasoning: '异常值需要正确传播，但不能让所有正常输入回退到慢路径；边界应只影响非有限权重。',
    solution: '检测异常权重并切换到语义一致路径，有限权重继续走原向量化热路径，兼顾正确性与性能。',
  },
  nltk: {
    problem: '`Concept` 的三个可变默认容器跨实例共享，修改一个对象会悄悄污染之后创建的概念。',
    reasoning: 'Python 默认参数只在函数定义时创建一次；默认实例要隔离，显式传入的容器仍应保留调用者语义。',
    solution: '改用 `None` 哨兵按实例创建 list / set，并以双实例回归覆盖全部默认容器的状态隔离。',
  },
  'apache-tvm': {
    problem: 'Relax ONNX Reshape 混淆零复制与字面零维，默认模式和 `allowzero=1` 都可能得到错误形状。',
    reasoning: '`0` 的含义受 allowzero 控制，而 `−1` 仍负责推断；不同语义不能被同一特殊分支覆盖。',
    solution: '默认先展开零复制；仅在允许且确有字面零时构造 ShapeExpr，其余路径继续保留正常 `−1` 推断。',
  },
  torchvision: {
    problem: 'JPEG v2 用 `view()` 展平批次维，transpose 产生的合法非连续 Tensor 会在编码前直接报错。',
    reasoning: '逻辑形状与内存连续性不是一回事；接口应保留元素顺序，同时只在确有必要时复制数据。',
    solution: '将展平改为 `reshape()` 并恢复原形状，以转置批次轴对照连续输入，锁定多前导维场景。',
  },
  lerobot: {
    problem: '`repo_ids` 与 `roots` 数量不一致时，普通 `zip` 会静默丢弃尾部数据集，任务却继续完成。',
    reasoning: '两组列表共同描述同一批数据源，长度相等是公开 API 的前置不变量，必须在读取数据前验证。',
    solution: '入口先校验数量并给出清晰错误，再使用 strict pairing，阻止机器人训练数据被静默截断。',
  },
};
