import { google } from "googleapis";

export function getCalendarClient(accessToken: string, refreshToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken, refresh_token: refreshToken });

  return google.calendar({ version: "v3", auth });
}
