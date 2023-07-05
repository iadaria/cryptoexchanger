'use client';
import React from 'react';

interface IFormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span className="label-text-alt text-red-700">{errorMessage}</span>
);
