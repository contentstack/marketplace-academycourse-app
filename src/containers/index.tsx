const DefaultPage = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="app-component-content">
          <p>
            Nothing to show here. Are you trying to access any of the following
            paths?
          </p>
          <ul className="ui-location">
            <li>
              <a href="/stack-dashboard">Stack Dashboard</a>
            </li>
            <li>
              <a href="/custom-field">Custom Field</a>
            </li>
            <li>
              <a href="/entry-sidebar">Entry Sidebar</a>
            </li>
            <li>
              <a href="/app-configuration">App Configuration</a>
            </li>
            <li>
              <a href="/asset-sidebar">Asset Sidebar</a>
            </li>
            <li>
              <a href="/full-page">Full Page</a>
            </li>
            <li>
              <a href="/field-modifier">Field Modifier</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DefaultPage;
