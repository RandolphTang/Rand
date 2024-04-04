import ReactGA4 from "react-ga4";
import { TRACKING_ID } from "/Users/y0311/OneDrive/Desktop/Codes/Projects/Projects/TouchGrass/touchgrass/key.json"; 

const InitializeGoogleAnalytics = () => {
  const tracking_id = TRACKING_ID; 
  ReactGA4.initialize(tracking_id);
  console.log("GA INITIALIZED");
};

const TrackGoogleAnalyticsEvent = (
  category,
  action,
) => {
  console.log("GA event = ", "category :" , category, ":", "action :", action);

  ReactGA4.event({
    category: category,
    action: action,
  });
};

export default InitializeGoogleAnalytics;
export { InitializeGoogleAnalytics, TrackGoogleAnalyticsEvent };