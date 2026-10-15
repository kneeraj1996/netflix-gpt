import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { OpenAIKey } from '../utils/constants';

// Initialize the client with your API key
// (Replace with process.env.REACT_APP_GEMINI_API_KEY if using CRA)
console.log('OpenAIKey=====',OpenAIKey)
const client = new GoogleGenAI({ apiKey: OpenAIKey });

export default client;
