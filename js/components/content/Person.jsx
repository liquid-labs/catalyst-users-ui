import { CardContainer, SectionGrid } from '@liquid-labs/mui-extensions'
import { ContentHeader } from '@liquid-labs/catalyst-theme'
import { ValidInput } from '@liquid-labs/react-validation'

const Person = (person) =>
  <>
    <ContentHeader>{person.email}</ContentHeader>
    <CardContainer>
      <SectionGrid title="General">
        <ValidInput
            label="Display name"
            value={person.displayName}
            maxLength="255"
            gridded={{xs : 12}}
            viewOnly
            defaultViewValue="<none>"
        />
      </SectionGrid>
      <SectionGrid title="Authentication">
        <ValidInput
            label="Email verified"
            value={person.emailVerified ? "yes" : "no"}
            maxLength="3"
            gridded={{xs : 12}}
            viewOnly
        />
      </SectionGrid>
    </CardContainer>
  </>

export { Person }
