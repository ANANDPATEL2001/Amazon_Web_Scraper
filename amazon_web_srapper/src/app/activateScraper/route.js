export async function POST(req) {
    console.log("Submitting...");

    const search = await req.body.search
    console.log("SEARCH IS >>", search);
}

// export default async function handler(req, res) {
//     // const { search } = req.body;
//     // console.log("SEARCH IS >> ", search);

//     console.log(req.body);

//     res.status(200).json({
//         collection_id: "1234",
//         start_eta: 1234,
//     });
// }