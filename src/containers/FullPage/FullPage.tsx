import FullPageGraphics from "../../assets/fullScreenGraphics.svg";
import localeTexts from "../../common/locales/en-us/index";
import parse from "html-react-parser";

const FullPageExtension = () => {
  return (
    <div className="full-page">
      <div className="full-page-container">
        <div className="full-page-graphics">
          <img src={FullPageGraphics} alt="icon" />
        </div>
        <div className="app-component-content full-page-app-component">
          <h4>{localeTexts.FullPage.title}</h4>
          <p>{parse(localeTexts.FullPage.body)}</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.contentstack.com/docs/developers/developer-hub/full-page-location/"
          >
            {localeTexts.FullPage.button.learnMore}
          </a>
        </div>
      </div>
    </div>
  );
};
export default FullPageExtension;
