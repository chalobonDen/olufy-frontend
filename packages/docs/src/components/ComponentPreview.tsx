import type { FC, HTMLAttributes, ReactElement } from 'react'
import { Children, useMemo, Suspense } from 'react'

import clsx from 'clsx'
import { FaSpinner } from 'react-icons/fa'
import { Tabs, TabsContent, TabsList, TabsPanels, TabsTrigger } from '@olufy-frontend/shared/UI'

import { REGISTRY } from '@/constants'

import CopyButton from './CopyButton'

interface IComponentPreviewProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  align?: 'center' | 'start' | 'end'
}

const ComponentPreview: FC<IComponentPreviewProps> = ({ name, align = 'center', children }) => {
  const Codes = Children.toArray(children) as ReactElement[]
  const Code = Codes[0]

  // _Memo
  const Preview = useMemo(() => {
    const Component = REGISTRY[name]?.component

    if (!Component) {
      return (
        <p className="text-muted-foreground text-sm">
          Component <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">{name}</code>{' '}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name])

  const codeString = useMemo(() => {
    if (typeof Code?.props['data-rehype-pretty-code-fragment'] !== 'undefined') {
      const [Button] = Children.toArray(Code.props.children) as ReactElement[]
      return Button?.props?.value || Button?.props?.__rawstring__ || null
    }
  }, [Code])

  return (
    <div className={clsx(`group relative my-4 flex flex-col space-y-2`)}>
      <Tabs>
        <TabsList>
          <TabsTrigger>Preview</TabsTrigger>
          <TabsTrigger>Code</TabsTrigger>
        </TabsList>

        <TabsPanels>
          <TabsContent>
            <div className={clsx(`relative rounded-lg border border-white-300`, `dark:border-dark-300`)}>
              <div
                className={clsx('flex min-h-[350px] w-full justify-center', {
                  'items-center': align === 'center',
                  'items-start': align === 'start',
                  'items-end': align === 'end',
                })}
              >
                <Suspense
                  fallback={
                    <div className={clsx(`flex items-center text-sm`)}>
                      <FaSpinner className={clsx(`mr-2 h-4 w-4 animate-spin`)} />
                      Loading...
                    </div>
                  }
                >
                  {Preview}
                </Suspense>
              </div>
            </div>
          </TabsContent>
          <TabsContent className={clsx(`relative`)}>
            {codeString && <CopyButton className={clsx(`!absolute right-2 top-2`)} value={codeString} />}

            <div className="flex flex-col space-y-4">
              <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">{Code}</div>
            </div>
          </TabsContent>
        </TabsPanels>
      </Tabs>
    </div>
  )
}

export default ComponentPreview
