import React from 'react'

export const REGISTRY: Record<string, any> = {
  // Buttons
  'button-demo': {
    name: 'button-demo',
    component: React.lazy(() => import('@/components/Example/Buttons/ButtonDemo')),
    files: ['src/components/Example/Buttons/ButtonDemo.tsx'],
  },
  'button-type-default': {
    name: 'button-type-default',
    component: React.lazy(() => import('@/components/Example/Buttons/ButtonTypeDefault')),
    files: ['src/components/Example/Buttons/ButtonTypeDefault.tsx'],
  },
  'button-type-icon-text': {
    name: 'button-type-icon-text',
    component: React.lazy(() => import('@/components/Example/Buttons/ButtonTypeIconText')),
    files: ['src/components/Example/Buttons/ButtonTypeIconText.tsx'],
  },
  'button-type-icon': {
    name: 'button-type-icon',
    component: React.lazy(() => import('@/components/Example/Buttons/ButtonTypeIcon')),
    files: ['src/components/Example/Buttons/ButtonTypeIcon.tsx'],
  },
}
