package com.portal.jobportal.aspects;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
@Slf4j
public class LoggingAndPerformanceAspect {

    @Around("execution(* com.portal.jobportal..*.*(..))")
    public Object logAndMeasureExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime =  System.currentTimeMillis();
        String methodName = joinPoint.getSignature().toShortString();
        Object[] methodArguments = joinPoint.getArgs();
        log.info("➡ Entering method: {}", methodName);
        log.info("➡ Arguments: {}", Arrays.toString(methodArguments));
        // Proceed with actual business method
        Object result = joinPoint.proceed();
        long executionTime = System.currentTimeMillis() - startTime;
        log.info("✅ Method Executed Successfully : {}", methodName);
        log.info("⏱ Execution Time : {}", executionTime);
        return result;
    }
}