import { PiArrowUpRightBold, PiCheckCircle, PiCode } from 'react-icons/pi';
import type { OpenSourceProject } from './open-source-data';
import OpenSourceVisual from './open-source-visual';

export default function OpenSourceContribution({ project }: { project: OpenSourceProject }) {
  return <section className="contribution-showcase">
    <header><span>CONTRIBUTION DEEP DIVE</span><h2>把修改画出来</h2><p>图示对应这个 PR 的真实根因和修复路径，不是统一套用的装饰模板。</p></header>
    <OpenSourceVisual kind={project.visualization} />
    <div className="contribution-proof-grid">
      <article><PiCheckCircle aria-hidden="true" /><div><small>验证证据</small><p>{project.validation}</p></div></article>
      <article><PiCode aria-hidden="true" /><div><small>主要改动文件</small><div className="changed-files">{project.files.map((file) => <code key={file}>{file}</code>)}</div></div></article>
    </div>
    <a className="contribution-pr-link" href={project.prHref} target="_blank" rel="noopener noreferrer"><span><small>MERGED PULL REQUEST</small>查看我的完整修改与讨论</span><PiArrowUpRightBold aria-hidden="true" /></a>
  </section>;
}
