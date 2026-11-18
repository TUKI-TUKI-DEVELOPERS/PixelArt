import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import CustomPhotobookFullEditorClient from "./CustomPhotobookFullEditorClient";

const editorProps = vi.hoisted(() => ({ last: null as Record<string, unknown> | null }));

vi.mock("next/navigation", () => ({ useRouter: () => ({ replace: vi.fn() }) }));
vi.mock("../[temaSlug]/editor/PhotobookEditorClient", () => ({
  default: (props: Record<string, unknown>) => {
    editorProps.last = props;
    return <div>Editor</div>;
  },
}));
vi.mock("./CustomPhotobookSheetSetup", () => ({ default: ({ correctionNotice }: { correctionNotice?: boolean }) => <div>{correctionNotice ? "Format correction required" : "Format setup"}</div> }));

function stubEditorFetch(state: Record<string, unknown>) {
  const fetchMock = vi.fn((input: RequestInfo | URL) => {
    const path = String(input);
    const body = path.endsWith("/session")
      ? { customerName: "Customer", customerEmail: "customer@example.com", customerPhone: "+51 999 111 222", title: "Book", frontCoverUrl: "/cover.jpg", backCoverUrl: null }
      : path.endsWith("/products")
        ? [{ id: 8 }]
        : { state };
    return Promise.resolve({ ok: true, json: async () => body });
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("CustomPhotobookFullEditorClient", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    editorProps.last = null;
  });

  it.each([undefined, "INVALID"])("requires correction for a 50-sheet draft with coverType %s", async (coverType) => {
    const pages = Array.from({ length: 100 }, () => ({}));
    const fetchMock = stubEditorFetch({ formatConfigured: true, pages, ...(coverType === undefined ? {} : { coverType }) });

    render(<CustomPhotobookFullEditorClient />);

    expect(await screen.findByText("Format correction required")).toBeTruthy();
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
  });

  it("accepts a 50-sheet draft with a valid thick cover", async () => {
    const pages = Array.from({ length: 100 }, () => ({}));
    stubEditorFetch({ formatConfigured: true, coverType: "TAPA_GRUESA", pages });

    render(<CustomPhotobookFullEditorClient />);

    expect(await screen.findByText("Editor")).toBeTruthy();
    expect(screen.queryByText("Format correction required")).toBeNull();
  });

  it("hands the request contact data from the session to the editor for prefilling", async () => {
    stubEditorFetch({ formatConfigured: true, coverType: "TAPA_DELGADA", pages: Array.from({ length: 30 }, () => ({})) });

    render(<CustomPhotobookFullEditorClient />);

    expect(await screen.findByText("Editor")).toBeTruthy();
    expect(editorProps.last).toMatchObject({
      customEditor: true,
      customerContact: { name: "Customer", email: "customer@example.com", phone: "+51 999 111 222" },
    });
  });
});
