<Form className="config-wrapper">
  <Field>
    <FieldLabel required htmlFor="title">
      {localeTexts.ConfigScreen.page.label}
    </FieldLabel>
    <TextInput
      type="text"
      required
      value={state?.installationData?.configuration?.title}
      placeholder={localeTexts.ConfigScreen.page.placeholder}
      name="title"
      onChange={updateConfig}
    />
  </Field>
</Form>;
