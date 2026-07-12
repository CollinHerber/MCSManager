// HTML from "index.html"
export const DAEMON_INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MCSManager Daemon</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
          sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 20px;
      }

      .container {
        background: white;
        border-radius: 8px;
        padding: 48px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        max-width: 540px;
        width: 100%;
        text-align: center;
        transition: all 0.6s;
      }

      .container:hover {
        transform: scale(1.01);
      }

      .logo {
        width: 64px;
        height: 64px;
        margin: 0 auto 24px;
        background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 28px;
        font-weight: bold;
      }

      .title {
        font-size: 24px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 16px;
        line-height: 1.4;
      }

      .description {
        font-size: 16px;
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 12px;
      }

      .link-section {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #e5e7eb;
      }

      .link-title {
        font-size: 14px;
        color: #9ca3af;
        margin-bottom: 8px;
        font-weight: 500;
      }

      .link {
        color: #1890ff;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s;
      }

      .link:hover {
        color: #40a9ff;
        text-decoration: underline;
      }

      @media (max-width: 640px) {
        .container {
          padding: 32px 24px;
          margin: 16px;
        }

        .title {
          font-size: 20px;
        }

        .description {
          font-size: 15px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div id="content">
        <h1 class="title">MCSManager Daemon is Running</h1>
        <p class="description">
          The MCSManager Daemon is running on this port. Connect using the MCSManager Web!
        </p>
        <p class="description">
          Uses WebSocket protocol with key authentication. Check MCSManager docs for details.
          Ensure WebSocket works through any reverse proxies or network mappings.
        </p>

        <div class="link-section">
          <div class="link-title">Documentation:</div>
          <a
            class="link"
            href="https://docs.mcsmanager.com/advanced/distributed.html#daemon-key"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://docs.mcsmanager.com/advanced/distributed.html
          </a>
        </div>
      </div>
    </div>
  </body>
</html>
`;
