import {
  Button,
  ButtonGroup,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
  Field,
  FieldLabel,
} from "@contentstack/venus-components";
import React, { useState } from "react";
import localeTexts from "../../common/locales/en-us";

const AudienceModal = ({ updateSelectedItems, ...props }: any) => {
  const [name, setName] = useState("");

  return (
    <>
      <ModalHeader
        title={localeTexts.CustomField.audienceModal.header}
        closeModal={props?.closeModal}
      />
      <ModalBody className="audienceModalBody">
        <Field>
          <FieldLabel required htmlFor="name">
            {" "}
            {"Name"}
          </FieldLabel>
          <TextInput
            type="text"
            name="name"
            placeholder={localeTexts.CustomField.audienceModal.placeholder}
            onChange={(e: any) => setName(e.target.value)}
          />
        </Field>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button buttonType="light" onClick={props?.closeModal}>
            {localeTexts.CustomField.audienceModal.cancelButton}
          </Button>
          <Button
            buttonType="secondary"
            icon="AddPlusBold"
            onClick={() => {
              updateSelectedItems(name);
              props?.closeModal();
            }}
          >
            {localeTexts.CustomField.audienceModal.confirmButton}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </>
  );
};

export default React.memo(AudienceModal);
