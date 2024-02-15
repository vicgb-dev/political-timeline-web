import './tests-components.css'
import * as r from '@radix-ui/themes'

function TestComponent () {
  return (
    <div className="test-components background5">
      <r.Card size="3">
        <r.Flex gap="3" align="center" direction="column">
          <r.Link href="https://www.google.com" target="_blank">
            <r.Heading size="5" weight="bold">
            Welcome
            </r.Heading>
          </r.Link>
        </r.Flex>
        <r.Flex gap="3" align="center" direction="column">
          <r.Heading size="3" weight="bold">
            Partidos
          </r.Heading>
        </r.Flex>
        <r.Flex gap="3" align="center" direction="column">
          <r.Heading size="2" weight="bold">
            Botones
          </r.Heading>
        </r.Flex>
        <r.Flex gap="3" align="center" direction="column">
          <r.Heading size="2" weight="bold">
            Contenido al abrir uno de los botones
          </r.Heading>
        </r.Flex>
        {/* <r.Box>
            <r.Text as="div" size="2" weight="bold">
        Teodros Girmay
            </r.Text>
            <r.Text as="div" size="2" color="gray">
        Engineering
            </r.Text>
          </r.Box> */}
      </r.Card>
    </div>
  )
}

export default TestComponent
