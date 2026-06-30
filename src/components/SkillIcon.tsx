import React, { Suspense, Component, type ReactNode } from 'react';
import { DynamicIconLoad, type SvgIconName } from 'portfolio-svg-icon-provider';

import { DynamicIcon, type IconName } from 'lucide-react/dynamic';

import { Code2 } from 'lucide-react';

class IconErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; icon?: string },
  { hasError: boolean; previousIcon?: string }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode; icon?: string }) {
    super(props);
    this.state = { hasError: false, previousIcon: props.icon };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  static getDerivedStateFromProps(
    props: { icon?: string },
    state: { hasError: boolean; previousIcon?: string },
  ) {
    if (props.icon !== state.previousIcon) {
      return { hasError: false, previousIcon: props.icon };
    }
    return null;
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

type SkillIconProps = {
  icon?: string;
  svg?: string;
  className?: string;
};

export const SkillIcon: React.FC<SkillIconProps> = ({ icon, svg, className }) => {
  // 1. Check for SVG icon provided by user
  if (svg) {
    return <DynamicIconLoad name={svg as SvgIconName} className={className} />;
  }

  // 2. Check for custom Lucide icon provided by user
  if (icon) {
    return (
      <IconErrorBoundary icon={icon} fallback={<Code2 className={className} />}>
        <Suspense key={icon} fallback={<Code2 className={className} />}>
          <DynamicIcon name={icon as IconName} className={className} />
        </Suspense>
      </IconErrorBoundary>
    );
  }

  // 3. Fallback generic icon
  return <Code2 className={className} />;
};
