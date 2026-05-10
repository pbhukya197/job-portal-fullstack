package com.portal.jobportal.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

/**
 * DTO for {@link com.portal.jobportal.entity.Contact}
 */
public record ContactRequestDto(
                                @NotBlank(message = "Email Cannot be Empty")
                                @Email(message = "Invalid Email Format")
                                String email,

                                @NotBlank(message = "Message Cannot be Empty")
                                @Size(min = 5, max = 500, message = "Message must be between 5 and 500 characters")
                                String message,

                                @NotBlank(message = "Name Cannot be Empty")
                                @Size(min = 5, max = 30, message = "Name must be between 5 and 30 characters")
                                String name,

                                @NotBlank(message = "Subject Cannot be Empty")
                                @Size(min = 5, max = 150, message = "Subject must be between 5 and 150 characters")
                                String subject,

                                @NotBlank(message = "User Type Cannot be Empty")
                                @Pattern(regexp = "Jobseeker|Employer|Other", message = "User Type must be either 'Jobseeker', 'Employer', or 'Other'")
                                String userType)
        implements Serializable {
}