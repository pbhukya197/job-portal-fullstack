package com.portal.jobportal.company.service;

import com.portal.jobportal.dto.CompanyDto;
import com.portal.jobportal.entity.Company;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ICompanyService {

    List<CompanyDto> getALLCompanies();

    List<CompanyDto> getAllCompaniesForAdmin();

    void deleteCompanyById(Long id);

    boolean updateCompanyDetails(Long id, CompanyDto companyDto);

    boolean createCompany(CompanyDto companyDto);
}
