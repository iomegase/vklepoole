import { PortfolioExperience } from "@/components/site/portfolio-experience";
import { getAdminSession } from "@/lib/auth/session";
import { getSiteContent } from "@/lib/site/store";
import type { PageKey } from "@/lib/site/types";

export async function renderPublicPage(currentPageKey: PageKey) {
  const [site, session] = await Promise.all([getSiteContent(), getAdminSession()]);

  return (
    <PortfolioExperience
      currentPageKey={currentPageKey}
      isAdmin={Boolean(session)}
      site={site}
    />
  );
}
