import Announcement, {
  AnnouncementDocument,
} from "../models/announcement.model";

export default class AnnouncementService {
  static async createAnnouncement(
    text: string,
    instructorId: string
  ): Promise<AnnouncementDocument> {
    console.log(text, instructorId);

    const announcement = new Announcement({
      text,
      instructor: instructorId,
    });

    return announcement.save();
  }
}
