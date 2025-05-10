export default function FullSidebar() {
    return(
        <div className="space-y-4 text-zinc-700">
            <h2 className="text-xl font-semibold mb-4 text-zinc-800">Menu</h2>

          <div className="font-medium flex items-center gap-2">
            <span>≡</span> All
            <span className="ml-auto text-zinc-400">4</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            🗑 Archived <span className="ml-auto">0</span>
          </div>

          <hr className="border-zinc-200" />
          <p className="text-xs text-zinc-400 uppercase">Status</p>
          <div className="flex justify-between">👁 New <span>5</span></div>
          <div className="flex justify-between">🧷 Open <span>2</span></div>
          <div className="flex justify-between">✅ Solved <span>1</span></div>
          <div className="text-blue-500 cursor-pointer">+ Add Status</div>

          <hr className="border-zinc-200" />
          <p className="text-xs text-zinc-400 uppercase">Group</p>
          <div>📢 Marketing</div>
          <div>💼 Sales</div>
          <div>🎨 Design</div>
          <div className="text-blue-500 cursor-pointer">+ Add Group</div>
        </div>
    );
}