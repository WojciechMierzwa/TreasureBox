package com.example.treasurebox.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class RequestOriginFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String origin = request.getHeader("Origin");
        String referer = request.getHeader("Referer");

        // For API requests, check if they come from our frontend
        if (request.getRequestURI().startsWith("/api/") || request.getRequestURI().startsWith("/watch/")) {
            // Skip preflight requests
            if (!request.getMethod().equals("OPTIONS")) {
                // If neither origin nor referer header matches our frontend, block the request
                if ((origin == null || !origin.equals("http://localhost:3000")) &&
                        (referer == null || !referer.startsWith("http://localhost:3000"))) {

                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.getWriter().write("Access denied: Direct API access not allowed");
                    return;
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}