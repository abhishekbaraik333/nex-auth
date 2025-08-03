

export default async function UserProfile({params}:any){
    const resolvedParams = await params;
    return (
        <div className="flex justify-center items-center min-h-screen">
            <h1>Profile page <span className="bg-yellow-500 text-black p-2">{resolvedParams.id}</span></h1>
        </div>
    )
}