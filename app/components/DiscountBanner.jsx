import { useMemo } from "react";
import { getInstance } from "@eppo/js-client-sdk";
import { useSearchParams } from "@remix-run/react";
import userService from "~/services/userService";

const DiscountBanner = () => {
  const [searchParams] = useSearchParams();

  const assignedVariation = useMemo(() => {
    // Process query params first
    const params = Object.fromEntries(searchParams);
    userService.setQueryParams(params);

    // Now get Eppo assignment with updated context
    const eppoClient = getInstance();
    const subjectKey = userService.getUserId();
    const context = userService.getContext();
    console.log("Eppo context at assignment:", context);

    const discountBannerDefault = {
        "title": "Special Offer!",
        "code": "SAVE20",
        "message": "at checkout",
        "backgroundColor": "#ff6b6b",
        "textColor": "white",
        "fontSize": "1rem",
        "codeColor": "#ff6b6b"
      }
    
    return eppoClient.getJSONAssignment("discount-banner", subjectKey, context, discountBannerDefault);
  }, [searchParams]);

  if (!assignedVariation) return null;

  const bannerStyle = {
    background: assignedVariation.backgroundColor || 'linear-gradient(90deg, #ff6b6b 0%, #ff8e8e 100%)',
    color: assignedVariation.textColor || 'white',
    textAlign: 'center',
    padding: '0.75rem',
    fontSize: assignedVariation.fontSize || '1rem',
    fontWeight: 500,
    zIndex: 10,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  const textStyle = {
    fontWeight: 700
  };

  const codeStyle = {
    background: 'white',
    color: assignedVariation.codeColor || '#ff6b6b',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    fontWeight: 700,
    margin: '0 0.3rem'
  };

  return (
    <div style={bannerStyle}>
      <p>
        <span style={textStyle}>{assignedVariation.title}</span>{' '}
        <span style={codeStyle}>{assignedVariation.code}</span>{' '}
        <span>{assignedVariation.message}</span>
      </p>
    </div>
  );
}

export default DiscountBanner; 