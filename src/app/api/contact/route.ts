import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    if (!resend) {
      return NextResponse.json(
        {
          success: false,
          message: "Email delivery is currently unavailable. Please contact us directly at brandhive.studio.lk@gmail.com.",
        },
        {
          status: 503,
        }
      );
    }

    const { error } = await resend.emails.send({
      from: "BrandHive Studio <onboarding@resend.dev>",
      to: ["brandhive.studio.lk@gmail.com"],
      subject: `🚀 New Project Inquiry from ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
          <h2 style="color:#16C7FF;">New Project Inquiry</h2>

          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding:8px;"><strong>Full Name</strong></td>
              <td style="padding:8px;">${name}</td>
            </tr>

            <tr>
              <td style="padding:8px;"><strong>Email</strong></td>
              <td style="padding:8px;">${email}</td>
            </tr>

            <tr>
              <td style="padding:8px;"><strong>Service</strong></td>
              <td style="padding:8px;">${service}</td>
            </tr>
          </table>

          <hr style="margin:25px 0;" />

          <h3>Project Description</h3>

          <p style="line-height:1.7;">
            ${message}
          </p>

          <hr style="margin:30px 0;" />

          <p style="color:#777;font-size:13px;">
            This inquiry was submitted from the BrandHive Studio website.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}