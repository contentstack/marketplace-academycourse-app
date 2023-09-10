import {
  Button,
  ButtonGroup,
  Field,
  FieldLabel,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "@contentstack/venus-components";
import React, { useState } from "react";

import localeTexts from "../../common/locales/en-us";

const ProductModal = ({ updateSelectedItems, ...props }: any) => {
  const [name, setName] = useState("");

  return (
    <>
      <ModalHeader
        title={localeTexts.CustomField.productModal.header}
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
            placeholder={localeTexts.CustomField.productModal.placeholder}
            onChange={(e: any) => setName(e.target.value)}
          />
        </Field>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button buttonType="light" onClick={props?.closeModal}>
            {localeTexts.CustomField.productModal.cancelButton}
          </Button>
          <Button
            buttonType="secondary"
            icon="AddPlusBold"
            onClick={() => {
              updateSelectedItems(name);
              props?.closeModal();
            }}
          >
            {localeTexts.CustomField.productModal.confirmButton}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </>
  );
};

export default React.memo(ProductModal);
