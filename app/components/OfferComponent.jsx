import { useMemo } from "react";
import { getInstance } from "@eppo/js-client-sdk";
import { useSearchParams } from "@remix-run/react";
import userService from "~/services/userService";

const OfferComponent = () => {
  const [searchParams] = useSearchParams();

  const assignedVariation = useMemo(() => {
    // Process query params first
    const params = Object.fromEntries(searchParams);
    console.log("Processing params for Eppo:", params);
    userService.setQueryParams(params);

    // Now get Eppo assignment with updated context
    const eppoClient = getInstance();
    const subjectKey = userService.getUserId();
    const context = userService.getContext();
    console.log("Eppo context at assignment:", context);
    
    return eppoClient.getJSONAssignment("cart-promo", subjectKey, context, {});
  }, [searchParams]);

  const mystyle = {
    color: assignedVariation.textcolor,
    fontSize: assignedVariation.fontsize
  };

  return (
    <div>
      <p style={mystyle}>{assignedVariation.promo}</p>
    </div>
  );
}

export default OfferComponent;


