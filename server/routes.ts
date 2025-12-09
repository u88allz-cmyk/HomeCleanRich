import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { sendConsultationSMS } from "./sms";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);
      
      await sendConsultationSMS({
        name: validatedData.name,
        phone: validatedData.phone,
        services: validatedData.services,
        message: validatedData.message
      });
      
      const response = {
        ...contact,
        createdAt: contact.createdAt.toISOString()
      };
      res.json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid request" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContactSubmissions();
      const response = contacts.map(contact => ({
        ...contact,
        createdAt: contact.createdAt.toISOString()
      }));
      res.json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
