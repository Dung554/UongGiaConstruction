// src/components/Overview.tsx
import { useInView } from '../hooks/useInView';

export default function Overview() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`${isInView ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Về thông tin</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Với hơn một thập kỷ kinh nghiệm, Uông Gia không chỉ là nhà thầu xây dựng mà còn là người đồng hành đáng tin cậy trên hành trình tạo dựng tổ ấm.Với hơn 10 năm kinh nghiệm, Uông Gia tự hào là người bạn đồng hành đáng tin cậy trong hành trình xây dựng mái ấm. Từng bản vẽ, từng công trình đều được chúng tôi chăm chút với tâm huyết và trách nhiệm. Chúng tôi mong muốn mỗi ngôi nhà không chỉ đẹp và vững chãi, mà còn là nơi khởi nguồn của hạnh phúc.

            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className={`bg-blue-50 p-6 rounded-lg transform transition hover:scale-105 ${isInView ? 'animate-bounce-in' : 'opacity-0'}`}>
              <div className="text-4xl font-bold text-blue-900 mb-2">15+</div>
              <p className="text-gray-600">Năm kinh nghiệm</p>
            </div>
            <div className={`bg-blue-50 p-6 rounded-lg transform transition hover:scale-105 ${isInView ? 'animate-bounce-in delay-100' : 'opacity-0'}`}>
              <div className="text-4xl font-bold text-blue-900 mb-2">80+</div>
              <p className="text-gray-600">Dự án hoàn thành</p>
            </div>
            <div className={`bg-blue-50 p-6 rounded-lg transform transition hover:scale-105 ${isInView ? 'animate-bounce-in delay-200' : 'opacity-0'}`}>
              <div className="text-4xl font-bold text-blue-900 mb-2">30+</div>
              <p className="text-gray-600">Chuyên gia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}