const updateConfig = async (e: any) => {
  // eslint-disable-next-line prefer-const
  let { name: fieldName, value: fieldValue } = e?.target || {};
  if (typeof fieldValue === "string") fieldValue = fieldValue?.trim();
  const updatedConfig = state?.installationData?.configuration || {};
  updatedConfig[fieldName] = fieldValue;
  if (typeof state?.setInstallationData !== "undefined") {
    await state?.setInstallationData({
      ...state.installationData,
      configuration: updatedConfig,
    });
  }
  return true;
};
