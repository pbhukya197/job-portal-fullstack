import httpClient, { withApiVersion } from "../config/httpClient";
import { API_ENDPOINTS } from "../config/api";

/**
 * Transform job data from backend to frontend structure
 */
export const transformJob = (job) => {
  // Safe parser for requirements and benefits
  const safeParseArray = (value, fieldName, jobId) => {
    try {
      // Already an array
      if (Array.isArray(value)) {
        return value;
      }

      // JSON string
      if (typeof value === "string") {
        // Empty string
        if (!value.trim()) {
          return [];
        }

        // Try parsing JSON
        const parsed = JSON.parse(value);

        // Ensure parsed value is array
        return Array.isArray(parsed) ? parsed : [parsed];
      }

      // Null/undefined
      return [];
    } catch (error) {
      console.warn(`Failed to parse ${fieldName} for job:`, jobId);

      // Fallback for comma-separated text
      if (typeof value === "string") {
        return value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }

      return [];
    }
  };

  const requirements = safeParseArray(
    job.requirements,
    "requirements",
    job.id
  );

  const benefits = safeParseArray(
    job.benefits,
    "benefits",
    job.id
  );

  return {
    id: job.id,
    title: job.title,
    company: job.companyName,
    companyLogo: job.companyLogo,
    companyId: job.companyId,
    location: job.location,
    workType: job.workType,
    jobType: job.jobType,
    category: job.category,
    experienceLevel: job.experienceLevel,

    salary: {
      min: parseFloat(job.salaryMin),
      max: parseFloat(job.salaryMax),
      currency: job.salaryCurrency,
      period: job.salaryPeriod,
    },

    description: job.description,
    requirements,
    benefits,

    postedDate: job.postedDate,
    applicationDeadline: job.applicationDeadline,
    applicationsCount: job.applicationsCount || 0,
    featured: job.featured || false,
    urgent: job.urgent || false,
    remote: job.remote || false,
    status: job.status,
  };
};

/**
 * Fetch all companies from the backend
 * Uses default API version (1.0) via Accept header in httpClient interceptor
 * Accept: application/vnd.eazyapp+json;v=1.0
 */
export const fetchCompanies = async () => {
  try {
    const response = await httpClient.get(API_ENDPOINTS.COMPANIES);
    const data = response.data;

    // Transform the backend data to match frontend structure
    return data.map((company) => ({
      id: company.id,
      name: company.name,
      logo: company.logo,
      industry: company.industry,
      size: company.size,
      rating: company.rating,
      locations: company.locations ? company.locations.split(",") : [],
      founded: company.founded,
      description: company.description,
      employees: company.employees,
      website: company.website,
      jobs: company.jobs ? company.jobs.map(transformJob) : [],
    }));
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

/**
 * Fetch all jobs from all companies
 */
export const fetchAllJobs = async () => {
  try {
    const companies = await fetchCompanies();

    // Flatten all jobs from all companies into a single array
    const allJobs = companies.flatMap((company) => company.jobs || []);

    return allJobs;
  } catch (error) {
    console.error("[companyService] Error fetching jobs:", error);
    throw error;
  }
};

/**
 * Fetch a single company by ID
 * Uses default API version (1.0) via Accept header in httpClient interceptor
 * Accept: application/vnd.eazyapp+json;v=1.0
 */
export const fetchCompanyById = async (id) => {
  try {
    const response = await httpClient.get(API_ENDPOINTS.COMPANY_BY_ID(id));
    const company = response.data;

    // Transform the backend data to match frontend structure
    return {
      id: company.id,
      name: company.name,
      logo: company.logo,
      industry: company.industry,
      size: company.size,
      rating: company.rating,
      locations: company.locations ? company.locations.split(",") : [],
      founded: company.founded,
      description: company.description,
      employees: company.employees,
      website: company.website,
    };
  } catch (error) {
    console.error("Error fetching company:", error);
    throw error;
  }
};

/**
 * Fetch a company by name (for detail pages that use company name in URL)
 */
export const fetchCompanyByName = async (name) => {
  try {
    const companies = await fetchCompanies();
    const company = companies.find(
      (c) =>
        c.name.toLowerCase().replace(/[^a-z0-9]/g, "") ===
        name.toLowerCase().replace(/[^a-z0-9]/g, "")
    );
    return company || null;
  } catch (error) {
    console.error("Error fetching company by name:", error);
    throw error;
  }
};