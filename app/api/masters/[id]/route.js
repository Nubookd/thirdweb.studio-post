import Master from "@/lib/masterModel";

export async function GET(request, { params }) {
  const resolveParams = await params;
  const id = resolveParams.id;
  try {
    const master = await Master.findMasterById(id);
    const comments = await Master.findCommentsByMasterId(id);
    console.log(comments);
    const res = {
      master: {
        id: master.master_id,
        name: master.master_name,
        description: master.master_description,
      },
    };

    if (comments && Array.isArray(comments)) {
      res.comments = comments.map((comment) => ({
        comment__id: comment.comment_id,
        user__id: comment.user_id,
        user__name: comment.user_name,
        master__id: comment.master_id,
        comment__text: comment.comment_text,
      }));
    }

    return Response.json(res);
  } catch (error) {
    return Response.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
