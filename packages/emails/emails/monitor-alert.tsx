/** @jsxImportSource react */

import {
  Body,
  CodeInline,
  Column,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Row,
  Text,
} from "@react-email/components";
import { z } from "zod";
import { Layout } from "./_components/layout";
import { colors, styles } from "./_components/styles";

const MonitorAlertSchema = z.object({
  type: z.enum(["degraded", "alert", "recovery"]),
  name: z.string().optional(),
  url: z.string().optional(),
  method: z.string().optional(),
  status: z.string().optional(),
  latency: z.string().optional(),
  region: z.string().optional(),
  timestamp: z.string().optional(),
  message: z.string().optional(),
});

export type MonitorAlertProps = z.infer<typeof MonitorAlertSchema>;

function getIcon(type: MonitorAlertProps["type"]): {
  src: string;
  color: string;
} {
  switch (type) {
    case "recovery":
      return {
        src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZWNrIj48cGF0aCBkPSJNMjAgNiA5IDE3bC01LTUiLz48L3N2Zz4=",
        color: colors.success,
      };
    case "alert":
      return {
        src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXgiPjxwYXRoIGQ9Ik0xOCA2IDYgMTgiLz48cGF0aCBkPSJtNiA2IDEyIDEyIi8+PC9zdmc+",
        color: colors.danger,
      };
    case "degraded":
      return {
        src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRyaWFuZ2xlLWFsZXJ0Ij48cGF0aCBkPSJtMjEuNzMgMTgtOC0xNGEyIDIgMCAwIDAtMy40OCAwbC04IDE0QTIgMiAwIDAgMCA0IDIxaDE2YTIgMiAwIDAgMCAxLjczLTMiLz48cGF0aCBkPSJNMTIgOXY0Ii8+PHBhdGggZD0iTTEyIDE3aC4wMSIvPjwvc3ZnPg==",
        color: colors.warning,
      };
  }
}

const MonitorAlertEmail = (props: MonitorAlertProps) => (
  <Html>
    <Head />
    <Preview>Your monitor's status is: {props.type}</Preview>
    <Body style={styles.main}>
      <Layout>
        <Row>
          <Column>
            <Heading as="h4">{props.name}</Heading>
          </Column>
          <Column style={{ textAlign: "right" }}>
            <Text
              style={{
                color: getIcon(props.type).color,
                textTransform: "uppercase",
              }}
            >
              {props.type}
            </Text>
          </Column>
        </Row>
        <Row style={styles.row}>
          <Column>
            <Text style={styles.bold}>Request</Text>
          </Column>
          <Column
            style={{
              textAlign: "right",
              flexWrap: "wrap",
              wordWrap: "break-word",
              maxWidth: "300px",
            }}
          >
            <Text>
              <CodeInline>{props.method}</CodeInline> {props.url}
            </Text>
          </Column>
        </Row>
        {/* REMINDER: no status code for TCP monitors */}
        {props.status ? (
          <Row style={styles.row}>
            <Column>
              <Text style={styles.bold}>Status</Text>
            </Column>
            <Column style={{ textAlign: "right" }}>
              <Text>{props.status}</Text>
            </Column>
          </Row>
        ) : null}
        <Row style={styles.row}>
          <Column>
            <Text style={styles.bold}>Region</Text>
          </Column>
          <Column style={{ textAlign: "right" }}>
            <Text>{props.region}</Text>
          </Column>
        </Row>
        {props.latency ? (
          <Row style={styles.row}>
            <Column>
              <Text style={styles.bold}>Latency</Text>
            </Column>
            <Column style={{ textAlign: "right" }}>
              <Text>{props.latency}</Text>
            </Column>
          </Row>
        ) : null}
        <Row style={styles.row}>
          <Column>
            <Text style={styles.bold}>Timestamp</Text>
          </Column>
          <Column style={{ textAlign: "right" }}>
            <Text>{props.timestamp}</Text>
          </Column>
        </Row>
        {props.message ? (
          <Row style={styles.row}>
            <Column>
              <Text>
                {props.message?.slice(0, 200)}
                {props.message?.length > 200 ? "..." : ""}
              </Text>
            </Column>
          </Row>
        ) : null}
        <Row style={styles.row}>
          <Column>
            <Text style={{ textAlign: "center" }}>
              <Link style={styles.link} href="https://openstatus.dev/app">
                View details
              </Link>
            </Text>
          </Column>
        </Row>
      </Layout>
    </Body>
  </Html>
);

MonitorAlertEmail.PreviewProps = {
  type: "alert",
  name: "Ping Pong",
  url: "https://openstatus.dev/ping",
  method: "GET",
  status: "200",
  latency: "300ms",
  region: "Amsterdam, Netherlands",
  timestamp: "2021-10-13T17:29:00Z",
  message:
    "This is a very long test message that will be truncated. Just testing it for the preview. Veryy veryy long message.",
} satisfies MonitorAlertProps;

export default MonitorAlertEmail;
