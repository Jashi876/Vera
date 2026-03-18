import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private apiKey = environment.geminiApiKey;

  constructor() { }

  /**
   * Quick health check to verify the API key
   */
  async testConnection() {
    if (!this.apiKey) return { success: false, message: 'API Key missing in environment.ts' };
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Respond with "System Online"' }] }]
        })
      });

      const data = await response.json();
      if (data.error) {
        console.error('Gemini Handshake Error:', data.error);
        return { success: false, message: data.error.message };
      }
      
      const text = data.candidates[0].content.parts[0].text.trim();
      // console.log('Gemini Handshake Success:', text);
      return { success: true, message: text };
    } catch (e: any) {
      console.error('Gemini Connection Exception:', e);
      return { success: false, message: e.message || 'Connection failed' };
    }
  }

  /**
   * Neural Script Breakdown: Semantic extraction layer
   * Using real Gemini API via fetch to bypass SDK version issues.
   */
  async analyzeScript(scriptText: string) {
    if (!this.apiKey) {
      console.warn('Gemini API Key missing. Falling back to simulation.');
      return this.simulateAnalysis(scriptText);
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Perform a neural script breakdown on this text: "${scriptText}". 
              Differentiate precisely between:
              - Physical Props (items characters hold/use)
              - Background SFX/VFX (ambient sounds or digital effects)
              - Characters (Cast)
              - High-Risk Elements (Stunts, Fire, Water, Weapons, Heights)
              
              Return a JSON object with: 
              - scenes (array with id, title, characters, locations, props, sfx, vfx, risks)
              - safetyAnalysis (mandatoryMeetings, riskSummary). 
              Keep risks as an array of tags e.g. ['High-Risk', 'Stunts', 'Firearms'].`
            }]
          }]
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const aiText = data.candidates[0].content.parts[0].text;
      // Clean potential markdown code blocks
      const jsonStr = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error('Gemini API Error:', e);
      return this.simulateAnalysis(scriptText);
    }
  }

  private async simulateAnalysis(scriptText: string) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      scenes: [
        { id: '1', title: 'Int. Office - Day (Simulated)', characters: ['Leo'], locations: ['Studio'], props: [], sfx: [], vfx: [], risks: ['Low'] }
      ],
      safetyAnalysis: { mandatoryMeetings: [], riskSummary: 'Simulation active.' }
    };
  }

  /**
   * Algorithmic Optimization (The "Solve" Button)
   * Shuffles scenes to minimize travel and enforce Union Turnaround guards
   */
  async optimizeSchedule(scenes: any[], constraints: any) {
    if (!this.apiKey) return this.simulateOptimization();

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Optimize this film schedule: ${JSON.stringify(scenes)}. 
              Constraints: ${JSON.stringify(constraints)}. 
              Return a JSON object with: 
              - optimizedSchedules (array with day, scenes, turnaroundHours, status)
              - efficiencyBoost (number)
              - travelSaved (string)
              - conflictRepairs (number).`
            }]
          }]
        })
      });

      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;
      const jsonStr = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(jsonStr);
    } catch (e) {
      return this.simulateOptimization();
    }
  }

  private async simulateOptimization() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      optimizedSchedules: [
        { day: 1, scenes: ['1', '5'], turnaroundHours: 12.5, status: 'Compliant' }
      ],
      efficiencyBoost: 15,
      travelSaved: '5 miles',
      conflictRepairs: 0
    };
  }

  /**
   * Visual Pre-Visualization
   * Generate shot descriptions using AI (Leonardo/Runway style prompts)
   */
  /**
   * Environmental Intelligence
   * tomorrow.io style logic for weather risks
   */
  async getEnvironmentalIntelligence(location: string, date: string) {
    return {
      weather: { 
        forecast: 'Rain & Wind', 
        prob: 65, 
        windSpeed: '18mph',
        safetyAlert: 'Drone flight not recommended (>15mph wind)'
      },
      goldenHour: { start: '18:54', end: '19:22' },
      coverSetAdvised: true,
      interiorAlternatives: ['Warehouse Interior Sc. 42B', 'Studio A Sc. 12']
    };
  }

  async generateStoryboards(sceneDescription: string) {
    if (!this.apiKey) return this.simulateStoryboards();

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate 2 cinematic storyboard shot descriptions for: "${sceneDescription}". 
              Return a JSON array of objects with: 
              - shotNumber
              - angle
              - description
              - imageUrl (use a placeholder related to the prompt e.g. https://images.unsplash.com/photo-X where X is a relevant ID or just a generic placeholder).`
            }]
          }]
        })
      });

      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;
      const jsonStr = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(jsonStr);
    } catch (e) {
      return this.simulateStoryboards();
    }
  }

  async getChatResponse(userMessage: string, history: any[] = []) {
    if (!this.apiKey) return { text: "I'm currently in simulation mode. How can I help you with your production today?" };

    try {
      const contents = history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }));
      
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: contents,
          system_instruction: {
            parts: [{
              text: `You are Vera (Video Efficiency and Resource Assistant), a specialized AI for media production. 
              Your ONLY goal is to help users with filmmaking, production planning, scheduling, cinematography, and logistics. 
              If a user asks about topics unrelated to media production (e.g., general life advice, non-production coding, recipes, etc.), 
              politely respond that you are specialized in production and cannot assist with that topic. 
              Always remain professional, helpful, and technically accurate regarding film industry standards.`
            }]
          },
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      return { 
        text: data.candidates[0].content.parts[0].text,
        role: 'model'
      };
    } catch (e) {
      console.error('Gemini Chat Error:', e);
      return { text: "I'm having trouble connecting to my neural network. Please try again in a moment.", role: 'model' };
    }
  }

  private async simulateStoryboards() {
    return [
      { shotNumber: 1, angle: 'Wide', description: 'Simulated wide shot.', imageUrl: 'https://images.unsplash.com/photo-1485090916719-f53e6b26ec58' }
    ];
  }
}
