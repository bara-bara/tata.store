import React, { useState } from 'react';
import { ShieldCheck, Lock, User, AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AdminLoginView: React.FC = () => {
  const { adminLogin, adminChangePassword, currentAdmin, setCurrentPage } = useStore();

  const [username, setUsername] = useState('tata');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // First-login password change modal
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await adminLogin(username.trim(), password);
    setLoading(false);

    if (res.success) {
      if (!res.mustChangePassword) {
        setCurrentPage('admin');
      }
    } else {
      setError(res.message || 'اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');

    if (newPassword.length < 8) {
      setPassError('يجب أن تتكون كلمة المرور الجديدة من 8 أحرف أو أرقام على الأقل');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('كلمتا المرور غير متطابقتين');
      return;
    }

    if (newPassword === 'tata@2005') {
      setPassError('لا يمكنك استخدام كلمة المرور الافتراضية الأولية، يرجى اختيار كلمة سر جديدة.');
      return;
    }

    const res = await adminChangePassword(password || 'tata@2005', newPassword);
    if (res.success) {
      setPassSuccess(true);
      setTimeout(() => {
        setCurrentPage('admin');
      }, 1000);
    } else {
      setPassError(res.message || 'تعذر تغيير كلمة المرور، يرجى المحاولة لاحقاً');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 text-right">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#E8DDCF] shadow-xl p-8 space-y-6">
        
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-[#2D5A27] text-white mx-auto flex items-center justify-center shadow-md">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-black text-[#2D241E]">لوحة تحكم TATA.STORE</h1>
          <p className="text-xs text-[#8C7A6B]">
            تسجيل الدخول المخصص لإدارة المتجر والطلبيات والمخزون
          </p>
        </div>

        {/* First login force password change screen */}
        {currentAdmin?.mustChangePassword ? (
          <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
            <div className="p-3 bg-[#FEF3C7] border border-[#FCD34D] rounded-2xl text-xs text-[#92400E] space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <KeyRound className="w-4 h-4" />
                <span>إجراء أمني إلزامي عند أول دخول:</span>
              </p>
              <p>
                حفاظاً على أمان متجر طاطا ستور، يرجى تعيين كلمة مرور جديدة خاصة بك واستبدال الكلمة
                الافتراضية.
              </p>
            </div>

            {passError && (
              <div className="p-3 bg-[#FDF2F2] border border-[#F5C2C2] text-xs text-[#B33939] rounded-xl font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            {passSuccess && (
              <div className="p-3 bg-[#E8F8EE] border border-[#A5D6A7] text-xs text-[#1B5E20] rounded-xl font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>تم تحديث كلمة المرور بنجاح! جاري تحويلك...</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#4A3B32] mb-1">
                كلمة المرور الجديدة:
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="أدخل كلمة مرور قوية..."
                className="w-full bg-[#FAF7F2] border border-[#E8DDCF] p-3 rounded-xl text-xs sm:text-sm focus:border-[#2D5A27] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A3B32] mb-1">
                تأكيد كلمة المرور الجديدة:
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="أعد كتابة كلمة المرور..."
                className="w-full bg-[#FAF7F2] border border-[#E8DDCF] p-3 rounded-xl text-xs sm:text-sm focus:border-[#2D5A27] focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2D5A27] hover:bg-[#23481E] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
            >
              حفظ ومتابعة إلى لوحة التحكم
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-[#FDF2F2] border border-[#F5C2C2] text-xs text-[#B33939] rounded-xl font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-[#4A3B32] mb-1.5">
                اسم المستخدم:
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="tata"
                  className="w-full bg-[#FAF7F2] border border-[#E8DDCF] text-xs sm:text-sm px-3.5 py-3 rounded-xl focus:border-[#2D5A27] focus:outline-hidden"
                />
                <User className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#4A3B32] mb-1.5">
                كلمة المرور:
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FAF7F2] border border-[#E8DDCF] text-xs sm:text-sm px-3.5 py-3 rounded-xl focus:border-[#2D5A27] focus:outline-hidden"
                />
                <Lock className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D5A27] hover:bg-[#23481E] disabled:bg-[#8C7A6B] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              {loading ? <span>جاري التحقق...</span> : <span>تسجيل الدخول للوحة التحكم</span>}
            </button>

            {/* Default credential helper hint */}
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DDCF] text-[11px] text-[#633C1A] space-y-1">
              <p className="font-bold text-[#2D5A27]">بيانات الدخول الأولية المعتمدة:</p>
              <p>اسم المستخدم: <code className="font-mono bg-white px-1 rounded">tata</code></p>
              <p>كلمة المرور: <code className="font-mono bg-white px-1 rounded">tata@2005</code></p>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
