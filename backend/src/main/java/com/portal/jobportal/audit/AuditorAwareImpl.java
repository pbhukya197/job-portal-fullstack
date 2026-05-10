package com.portal.jobportal.audit;

import com.portal.jobportal.util.ApplicationUtility;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("auditorAwareImpl")
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        // In a real application, you would retrieve the current user from the security context
        // For simplicity, we will return a fixed username here
        return Optional.of(ApplicationUtility.getLoggedInUser());
    }
}
