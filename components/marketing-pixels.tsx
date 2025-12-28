// Facebook Pixel
export function FacebookPixel() {
    const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

    if (!PIXEL_ID) return null

    return (
        <>
            <script
                id="facebook-pixel"
                dangerouslySetInnerHTML={{
                    __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
                }}
            />
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                    alt=""
                />
            </noscript>
        </>
    )
}

// LinkedIn Insight Tag
export function LinkedInInsightTag() {
    const PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID

    if (!PARTNER_ID) return null

    return (
        <script
            id="linkedin-insight"
            dangerouslySetInnerHTML={{
                __html: `
          _linkedin_partner_id = "${PARTNER_ID}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `,
            }}
        />
    )
}

// Microsoft Clarity
export function MicrosoftClarity() {
    const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

    if (!PROJECT_ID) return null

    return (
        <script
            id="microsoft-clarity"
            dangerouslySetInnerHTML={{
                __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${PROJECT_ID}");
        `,
            }}
        />
    )
}

// Track Facebook Pixel Events
export const trackFBEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', eventName, params)
    }
}

// Common FB Events
export const trackFBLead = () => trackFBEvent('Lead')
export const trackFBContact = () => trackFBEvent('Contact')
export const trackFBViewContent = (contentName: string) => {
    trackFBEvent('ViewContent', { content_name: contentName })
}
